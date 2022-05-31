import { Argon2HashingFunction } from "authentication-module/src/argon2-hashing";
import { UserStore } from "authentication-module/src/authenticator";
import { loadFeature, defineFeature } from "jest-cucumber";
import parse, { HTMLElement } from "node-html-parser";
import { instance, mock, when } from "ts-mockito";
import { NotesWebserver } from "../src/notes-webserver";
import { HttpClient, HttpResponse } from "../test/http-client";

const feature = loadFeature("./specs/sign-in-flow.feature");

defineFeature(feature, (test) => {
  const testClient = new HttpClient();
  const testPort = 8135;

  let server: NotesWebserver;
  let currentPage: string; // last url the client loaded
  let response: HttpResponse; // response of the last testClient call
  let pageRoot: HTMLElement; // root element of currently loaded page
  let el: HTMLElement; // currently selected element
  let form: { [key: string]: string } = {}; // form for the page

  afterAll(() => {
    server && server.stop();
  });

  const getRequest = async (url: string) => {
    currentPage = url;
    const address = `http://localhost:${testPort}${url}`;
    response = await testClient.get(address);
  };

  const postFormRequest = async (
    url: string,
    formData: { [key: string]: string }
  ) => {
    const address = `http://localhost:${testPort}${url}`;
    response = await testClient.postForm(address, formData);
    // convention: every post request ends up with a redirect:
    currentPage = response.getResponsePath();
  };

  const processNewPage = async () => {
    pageRoot = parse(await response.getBody());
    form = {};
  };

  const checkCurrentPage = async (page: string) => {
    expect(currentPage).toBe(`/${page}`);
  };

  const checkElement = (elementDataID: string) => {
    el = pageRoot.querySelector(`*[data-testid=${elementDataID}]`);
    expect(el).toBeTruthy();
  };
  const checkElementIsNotPresent = (elementDataID: string) => {
    el = pageRoot.querySelector(`*[data-testid=${elementDataID}]`);
    expect(el).toBe(null);
  };

  const setInputValue = (value: string) => {
    const inputName = el.getAttribute("name");
    expect(inputName).toBeTruthy();
    form[inputName] = value;
  };

  const handleLinkClick = async () => {
    const href = el.getAttribute("href");
    await getRequest(String(href));
  };
  const handleButtonClick = async () => {
    const form = el.parentNode;
    expect(form.tagName).toBe("FORM");
    expect(form.getAttribute("method")).toBe("post");
    const url = form.getAttribute("action");
    await postFormRequest(url, {});
  };

  const handleClick = async () => {
    switch (el.tagName) {
      case "A":
        return await handleLinkClick();
      case "BUTTON":
        return await handleButtonClick();
      default:
        throw `handleClick for ${el.tagName} is not supported`;
    }
  };

  const loadPage = async (page: string) => {
    await getRequest(`/${page}`);
  };

  const hashingFunction = new Argon2HashingFunction();
  const testUserStore = mock<UserStore>();
  when(testUserStore.getUserByName("user1")).thenCall(async () => {
    return {
      username: "user1",
      passwordHash: await hashingFunction.generateHash("1234"),
    };
  });

  test("Sucessful sign in for user1", ({ given, when, then, and }) => {
    given("web server is running", () => {
      server = new NotesWebserver({
        userStore: instance(testUserStore),
        jwtSerializerSecretKey: "some-secret",
      });
      server.listen(testPort);
    });
    when(/^I visit \/([a-z]+) page$/, loadPage);
    when("page is loaded", processNewPage);
    then(/^I see '([a-z-]+)' element$/, checkElement);
    when("I click on it", handleClick);
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
      if (formMethod !== "post") {
        throw "only post form method is implemented in this step definition";
      }
      await postFormRequest(formAction, form);
    });
    then(/^I am navigated to \/([a-z]+) page$/, checkCurrentPage);
    when("page is loaded", processNewPage);
    then(/^I see '([a-z-]+)' element$/, checkElement);
    and(/^it has inner text of '(.+)'$/, async (innerText) => {
      expect(el.innerText).toBe(innerText);
    });
    then(/^I see '([a-z-]+)' element$/, checkElement);
    when("I click on it", handleClick);
    then(/^I am navigated to \/([a-z]+) page$/, checkCurrentPage);
    when("page is loaded", processNewPage);
    then(/^I see '([a-z-]+)' element$/, checkElement);
    when(/^I visit \/([a-z]+) page$/, loadPage);
    when("page is loaded", processNewPage);
    then(/^I see '([a-z-]+)' element$/, checkElement);
    and(/^I do not see '([a-z-]+)' element$/, checkElementIsNotPresent);
    and(/^I do not see '([a-z-]+)' element$/, checkElementIsNotPresent);
  });
});
