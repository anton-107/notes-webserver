import { UserStore } from "authentication-module/src/authenticator";
import { loadFeature, defineFeature } from "jest-cucumber";
import parse from "node-html-parser";
import { instance, mock } from "ts-mockito";
import { NotesWebserver } from "../src/notes-webserver";
import { HttpClient, HttpResponse } from "../test/http-client";

const feature = loadFeature("./specs/sign-in-flow.feature");

defineFeature(feature, (test) => {
  const testClient = new HttpClient();
  const testPort = 8135;

  let server;
  let currentPage; // last url the client loaded
  let response: HttpResponse; // response of the last testClient call
  let pageRoot; // root element of currently loaded page
  let el; // currently selected element
  let form = {}; // form for the page

  afterAll(() => {
    server && server.stop();
  });

  const getRequest = async (url) => {
    currentPage = url;
    const address = `http://localhost:${testPort}${url}`;
    response = await testClient.get(address);
  };

  const postFormRequest = async (url, formData) => {
    const address = `http://localhost:${testPort}${url}`;
    response = await testClient.postForm(address, formData);
    // convention: every post request ends up with a redirect:
    currentPage = response.getResponsePath();
  };

  const processNewPage = async () => {
    pageRoot = parse(await response.getBody());
    form = {};
  };

  const checkCurrentPage = async (page) => {
    expect(currentPage).toBe(`/${page}`);
  };

  const checkElement = (elementDataID) => {
    el = pageRoot.querySelector(`*[data-testid=${elementDataID}]`);
    expect(el).toBeTruthy();
  };

  const setInputValue = (value) => {
    const inputName = el.getAttribute("name");
    expect(inputName).toBeTruthy();
    form[inputName] = value;
  };

  test("Sucessful sign in for user1", ({ given, when, then, and }) => {
    given("web server is running", () => {
      server = new NotesWebserver({
        userStore: instance(mock<UserStore>()),
      });
      server.listen(testPort);
    });
    when(/^I visit \/([a-z]+) page$/, async (page) => {
      await getRequest(`/${page}`);
    });
    when("page is loaded", processNewPage);
    then(/^I see '([a-z-]+)' element$/, checkElement);
    when("I click on it", async () => {
      const href = el.getAttribute("href");
      await getRequest(String(href));
    });
    then(/^I am navigated to \/([a-z]+) page$/, checkCurrentPage);
    when("page is loaded", processNewPage);
    then(/^I see '([a-z-]+)' element$/, checkElement);
    and(/^I focus on it and type '([A-z0-9]+)'$/, setInputValue);
    and(/^I see '([a-z-]+)' element$/, checkElement);
    and(/^I focus on it and type '([A-z0-9]+)'$/, setInputValue);
    and(/^I press 'Enter' on keyboard$/, async () => {
      const forms = pageRoot.querySelectorAll("form");
      expect(forms.length).toBe(1);
      const formEl = forms[0];
      const formMethod = formEl.getAttribute("method");
      const formAction = formEl.getAttribute("action");
      expect(formMethod).toBeTruthy();
      expect(formAction).toBeTruthy();
      console.log("Send form: ", formMethod, formAction, form);
      if (formMethod !== "post") {
        throw "only post form method is implemented in this step definition";
      }
      await postFormRequest(formAction, form);
    });
    then(/^I am navigated to \/([a-z]+) page$/, checkCurrentPage);
    when("page is loaded", processNewPage);
  });
});
