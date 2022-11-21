import { ScryptHashingFunction } from "authentication-module/dist/scrypt-hashing";
import jsonQuery from "json-query";
import parse, { HTMLElement } from "node-html-parser";
import {
  dependenciesConfiguration,
  ServiceConfiguration,
} from "../src/configuration/configuration";
import { NotesWebserver } from "../src/notes-webserver";
import { HttpClient, HttpResponse, JSONData } from "../test/http-client";
import { routes } from "./../src/router";

type FormData = { [key: string]: string };

export class TestScenario {
  private server: NotesWebserver;
  private serviceConfiguration: ServiceConfiguration;
  private currentPage: string; // last url the client loaded
  private response: HttpResponse; // response of the last testClient call
  private testClient = new HttpClient();
  private form: { [key: string]: string } = {}; // form on the page (gets populated when test interacts with inputs)
  private pageRoot: HTMLElement; // root element of currently loaded page
  private el: HTMLElement; // currently selected element
  private binaryResponse: string;
  private jsonResponse: JSONData;
  private jsonList: string | { [key: string]: string }[];
  private jsonURL: string | undefined = undefined;
  private jsonRequestBody: JSONData | undefined = undefined;
  private loggedInUser: string;

  // testing single noteebook page:
  private notebookHref: string;
  private notebookID: string;
  private noteID: string;
  private noteAttachmentID: string;
  private lastKnownID: string; // captured when the processed JSON response has an id field

  constructor(private testPort: number) {}

  public async startServer() {
    const hashingFunction = new ScryptHashingFunction();
    const config = dependenciesConfiguration({});
    this.serviceConfiguration = config;
    config.userStore.addUser({
      username: "user1",
      passwordHash: await hashingFunction.generateHash("1234"),
    });

    this.server = new NotesWebserver({
      ...config,
      routes,
    });

    this.server.listen(this.testPort);
  }
  public stopServer() {
    if (this.server) {
      this.server.stop();
    }
  }
  public async loginAs(user: string, password: string) {
    await this.loadPage("home");
    await this.processNewPage();
    this.checkElement("sign-in-link");
    await this.handleClick();
    await this.checkCurrentPage("signin");
    await this.processNewPage();
    this.checkElement("user-login");
    this.setInputValue(user);
    this.checkElement("user-password");
    this.setInputValue(password);
    await this.submitForm();
    this.checkCurrentPage("home");
    this.loggedInUser = user;
  }
  public async createNotebook(notebookName: string) {
    await this.loadPage("home");
    await this.processNewPage();
    this.checkElement("create-new-notebook-link");
    await this.handleClick();
    await this.processNewPage();
    this.checkElement("notebook-name-input");
    this.setInputValue(notebookName);
    await this.submitForm();
    this.checkCurrentPage("home");
    await this.processNewPage();
    this.checkElement("notebook-name");
    this.checkInnerText(notebookName);
    this.captureNotebookHref();
  }
  public async createNote(noteContent: string) {
    this.setJSONRequestBody(
      JSON.stringify({
        "note-type": "note",
        "notebook-id": "{notebook-id}",
        "note-content": noteContent,
      })
    );
    await this.postJSON("/note");
    await this.processJSON();
    this.noteID = this.lastKnownID;
  }
  public async createAttachment(
    attachmentName: string,
    attachmentContent: string
  ) {
    const objectKey = await this.serviceConfiguration.attachmentsStore.persist(
      attachmentContent
    );
    this.noteAttachmentID = "test-scenario-id";
    await this.serviceConfiguration.noteAttachmentsStore.add({
      id: this.noteAttachmentID,
      noteID: this.noteID,
      name: attachmentName,
      objectKey,
      createdAt: new Date().toISOString(),
      owner: this.loggedInUser,
    });
  }
  public async createPerson(employeeName: string) {
    await this.loadPage("home");
    await this.processNewPage();
    this.checkElement("create-new-person-link");
    await this.handleClick();
    await this.processNewPage();
    this.checkElement("person-name-input");
    this.setInputValue(employeeName);
    await this.submitForm();
  }
  public async navigateToNotebookPage() {
    await this.getRequest(this.notebookHref);
  }
  public async loadPage(page: string) {
    const url = page
      .replace("{notebook-id}", this.notebookID)
      .replace("{note-id}", this.noteID)
      .replace("{attachment-id}", this.noteAttachmentID);
    await this.getRequest(`/${url}`);
  }
  public async loadJSONURL() {
    if (!this.jsonURL) {
      throw Error("can not load undefined url");
    }
    await this.getJSONRequest(this.jsonURL);
  }
  public async processNewPage() {
    expect(this.response.getStatus()).toBeLessThan(300);
    this.pageRoot = parse(await this.response.getBody());
    this.form = {};
  }
  public async processJSON() {
    expect(this.response.getStatus()).toBeLessThan(300);
    this.form = {};
    const body = await this.response.getBody();
    this.jsonResponse = JSON.parse(body);
    if (this.jsonResponse["id"]) {
      this.lastKnownID = String(this.jsonResponse["id"]);
    }
  }
  public async processBinaryResponse() {
    const body = await this.response.getBody();
    this.binaryResponse = body;
  }
  public checkJSONField(fieldName: string, fieldValue: string) {
    const actualValue = this.jsonResponse[fieldName];
    expect(actualValue).toBe(fieldValue);
  }
  public checkJSONFieldIsNonEmptyString(fieldName: string) {
    const actualValue = this.jsonResponse[fieldName];
    expect(typeof actualValue).toBe("string");
    expect(actualValue.length).toBeGreaterThan(0);
  }
  public captureJSONFieldList(fieldName: string) {
    this.jsonList = this.jsonResponse[fieldName];
    expect(Array.isArray(this.jsonList)).toBe(true);
  }
  public checkJSONFieldListIsEmpty(fieldName: string) {
    const jsonList = this.jsonResponse[fieldName];
    expect(Array.isArray(jsonList)).toBe(true);
    expect(jsonList.length).toBe(0);
  }
  public checkBinaryResponse(expectedResponse: string) {
    expect(this.binaryResponse).toBe(expectedResponse);
  }
  public setJSONRequestBody(inputString: string) {
    const json = inputString
      .replace("{notebook-id}", this.notebookID)
      .replace("{last-known-id}", this.lastKnownID);
    try {
      this.jsonRequestBody = JSON.parse(json);
    } catch (err) {
      throw `Could not parse json request: ${json}. Error: ${err}`;
    }
  }
  public checkFirstListElement(fieldName: string, fieldValue: string) {
    const firstElement = this.jsonList[0];
    if (typeof firstElement === "string") {
      throw "Expected an object in json list, but got string";
    }
    const actualValue = firstElement[fieldName];
    expect(actualValue).toBe(fieldValue);
  }
  public checkFirstListElementForPattern(fieldName: string, pattern: RegExp) {
    const firstElement = this.jsonList[0];
    if (typeof firstElement === "string") {
      throw "Expected an object in json list, but got string";
    }
    const actualValue = firstElement[fieldName];
    expect(actualValue).toMatch(pattern);
  }
  public checkJSONQuery(query: string, expectedValue: string | number) {
    const actualValue = jsonQuery(query, { data: this.jsonResponse }).value;
    if (actualValue !== expectedValue) {
      console.log("Was checking checkJSONQuery", query, this.jsonResponse);
    }
    expect(actualValue).toBe(expectedValue);
  }
  public captureURLFromFirstListElement(fieldName: string) {
    const firstElement = this.jsonList[0];
    if (typeof firstElement === "string") {
      throw "Expected an object in json list, but got string";
    }
    const actualValue = firstElement[fieldName];
    this.jsonURL = actualValue;
  }
  public checkElement(elementDataID: string) {
    this.el = this.pageRoot.querySelector(`*[data-testid=${elementDataID}]`);
    try {
      expect(this.el).toBeTruthy();
    } catch (err) {
      console.warn("Was checking if element exists in DOM:", elementDataID);
      console.debug("DOM tree", this.pageRoot.innerHTML);
      throw err;
    }
  }
  public checkElementIsNotPresent = (elementDataID: string) => {
    this.el = this.pageRoot.querySelector(`*[data-testid=${elementDataID}]`);
    expect(this.el).toBe(null);
  };
  public async handleClick() {
    switch (this.el.tagName) {
      case "A":
        return await this.handleLinkClick();
      case "BUTTON":
        return await this.handleButtonClick();
      default:
        throw `handleClick for ${this.el.tagName} is not supported`;
    }
  }
  public checkCurrentPage(page: string) {
    let regex = page.replace("{notebook-id}", "[A-z0-9]{1,32}");
    regex = regex.replace("{person-id}", "[A-z0-9]{1,32}");
    regex = regex.replace("{note-id}", "[A-z0-9]{1,32}");
    expect(this.currentPage).toMatch(new RegExp(`^/${regex}$`));
  }
  public setSelectedOption = (optionName: string) => {
    const inputName = this.el.getAttribute("name");
    expect(inputName).toBeTruthy();

    const options = this.el.querySelectorAll("option");
    const option = options.find((x) => x.innerText === optionName);
    expect(option).toBeTruthy();

    const value = option.getAttribute("value");

    this.form[inputName] = value;
    this.el.setAttribute("value", value);
  };
  public setInputValue = (value: string) => {
    const inputName = this.el.getAttribute("name");
    expect(inputName).toBeTruthy();
    this.form[inputName] = value;
    this.el.setAttribute("value", value);
  };
  public async submitForm() {
    const forms = this.pageRoot.querySelectorAll("form");
    const formEl = forms[0];
    const formMethod = formEl.getAttribute("method");
    const formAction = formEl.getAttribute("action");
    expect(formMethod).toBeTruthy();
    expect(formAction).toBeTruthy();
    if (formMethod !== "post") {
      throw "only post form method is implemented in this step definition";
    }

    // serialize form elements:
    const formElements = formEl.querySelectorAll("input");
    formElements.forEach((x) => {
      this.form[x.getAttribute("name")] = x.getAttribute("value");
    });

    await this.postFormRequest(formAction, this.form);
  }
  public checkInnerText(innerText: string) {
    expect(this.el.innerText).toBe(innerText);
  }
  public checkValue(value: string) {
    expect(this.el.getAttribute("value")).toBe(value);
  }
  public checkSelectedOption(value: string) {
    const selectedOption = this.el.querySelector("option[selected]");
    expect(selectedOption.innerText).toBe(value);
  }

  private async getRequest(url: string) {
    this.currentPage = url;
    const address = `http://localhost:${this.testPort}${url}`;
    this.response = await this.testClient.get(address);
  }
  private async getJSONRequest(url: string) {
    this.currentPage = url;
    const address = `http://localhost:${this.testPort}${url}`;
    this.response = await this.testClient.get(address, {
      "content-type": "application/json",
    });
  }
  private async handleLinkClick() {
    const href = this.el.getAttribute("href");
    await this.getRequest(String(href));
  }
  private async handleButtonClick() {
    const form = this.el.parentNode;
    expect(form.tagName).toBe("FORM");
    expect(form.getAttribute("method")).toBe("post");

    const formData: FormData = {};
    const formElements = form.querySelectorAll("input");
    formElements.forEach((x) => {
      formData[x.getAttribute("name")] = x.getAttribute("value");
    });

    const url = form.getAttribute("action");
    await this.postFormRequest(url, formData);
  }
  private async postFormRequest(url: string, formData: FormData) {
    const address = `http://localhost:${this.testPort}${url}`;
    this.response = await this.testClient.postForm(address, formData);
    // convention: every post form request ends up with a redirect:
    this.currentPage = this.response.getResponsePath();
  }
  public async postJSON(url: string) {
    if (!this.jsonRequestBody) {
      throw Error("Can not post undefined JSON body");
    }
    const address = `http://localhost:${this.testPort}${url}`
      .replace("{notebook-id}", this.notebookID)
      .replace("{last-known-id}", this.lastKnownID);
    console.log("post JSON", address, this.jsonRequestBody);
    this.response = await this.testClient.postJSON(
      address,
      this.jsonRequestBody
    );
  }
  private captureNotebookHref() {
    this.notebookHref = this.el.getAttribute("href");
    expect(this.notebookHref.startsWith("/notebook/")).toBe(true);
    this.notebookID = this.notebookHref.replace("/notebook/", "");
    expect(this.notebookID.length > 1).toBe(true);
  }
}
