import { Argon2HashingFunction } from "authentication-module/dist/argon2-hashing";
import { UserStore } from "authentication-module/dist/authenticator";
import parse, { HTMLElement } from "node-html-parser";
import { instance, mock, when } from "ts-mockito";
import { NotebookStore } from "../src/notebook-store";
import { NotesWebserver } from "../src/notes-webserver";
import { HttpClient, HttpResponse } from "../test/http-client";

export class TestScenario {
  private server: NotesWebserver;
  private currentPage: string; // last url the client loaded
  private response: HttpResponse; // response of the last testClient call
  private testClient = new HttpClient();
  private form: { [key: string]: string } = {}; // form on the page (gets populated when test interacts with inputs)
  private pageRoot: HTMLElement; // root element of currently loaded page
  private el: HTMLElement; // currently selected element

  constructor(private testPort: number) {}

  public startServer() {
    const hashingFunction = new Argon2HashingFunction();
    const testUserStore = mock<UserStore>();
    when(testUserStore.getUserByName("user1")).thenCall(async () => {
      return {
        username: "user1",
        passwordHash: await hashingFunction.generateHash("1234"),
      };
    });

    this.server = new NotesWebserver({
      userStore: instance(testUserStore),
      jwtSerializerSecretKey: "some-secret",
      notebookStore: new NotebookStore(),
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
  }
  public async loadPage(page: string) {
    await this.getRequest(`/${page}`);
  }
  public async processNewPage() {
    this.pageRoot = parse(await this.response.getBody());
    this.form = {};
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
    expect(this.currentPage).toBe(`/${page}`);
  }
  public setInputValue = (value: string) => {
    const inputName = this.el.getAttribute("name");
    expect(inputName).toBeTruthy();
    this.form[inputName] = value;
  };
  public async submitForm() {
    const forms = this.pageRoot.querySelectorAll("form");
    expect(forms.length).toBe(1);
    const formEl = forms[0];
    const formMethod = formEl.getAttribute("method");
    const formAction = formEl.getAttribute("action");
    expect(formMethod).toBeTruthy();
    expect(formAction).toBeTruthy();
    if (formMethod !== "post") {
      throw "only post form method is implemented in this step definition";
    }
    await this.postFormRequest(formAction, this.form);
  }
  public checkInnerText(innerText: string) {
    expect(this.el.innerText).toBe(innerText);
  }

  private async getRequest(url: string) {
    this.currentPage = url;
    const address = `http://localhost:${this.testPort}${url}`;
    this.response = await this.testClient.get(address);
  }
  private async handleLinkClick() {
    const href = this.el.getAttribute("href");
    await this.getRequest(String(href));
  }
  private async handleButtonClick() {
    const form = this.el.parentNode;
    expect(form.tagName).toBe("FORM");
    expect(form.getAttribute("method")).toBe("post");
    const url = form.getAttribute("action");
    await this.postFormRequest(url, {});
  }
  private async postFormRequest(
    url: string,
    formData: { [key: string]: string }
  ) {
    const address = `http://localhost:${this.testPort}${url}`;
    this.response = await this.testClient.postForm(address, formData);
    // convention: every post request ends up with a redirect:
    this.currentPage = this.response.getResponsePath();
  }
}
