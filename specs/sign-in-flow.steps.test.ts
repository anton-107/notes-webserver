import { UserStore } from "authentication-module/src/authenticator";
import { loadFeature, defineFeature } from "jest-cucumber";
import parse from "node-html-parser";
import { instance, mock } from "ts-mockito";
import { NotesWebserver } from "../src/notes-webserver";
import { HttpClient } from "../test/http-client";

const feature = loadFeature("./specs/sign-in-flow.feature");

defineFeature(feature, (test) => {
  const testClient = new HttpClient();
  const testPort = 8135;

  let server;
  let currentPage; // last url the client loaded
  let response; // response of the last testClient call
  let pageRoot; // root element of currently loaded page
  let el; // currently selected element

  afterAll(() => {
    server && server.stop();
  });

  const getRequest = async (url) => {
    currentPage = url;
    const address = `http://localhost:${testPort}${url}`;
    response = await testClient.get(address);
  };

  const parseResponseBody = () => {
    pageRoot = parse(response.getBody());
  };

  test("Sucessful sign in for user1", ({ given, when, then }) => {
    given("web server is running", () => {
      server = new NotesWebserver({
        userStore: instance(mock<UserStore>()),
      });
      server.listen(testPort);
    });
    when(/^I visit \/([a-z]+) page$/, async (page) => {
      await getRequest(`/${page}`);
    });
    when("page is loaded", parseResponseBody);
    then(/^I see '([a-z-]+)' element$/, (elementDataID) => {
      el = pageRoot.querySelector(`*[data-testid=${elementDataID}]`);
      expect(el).toBeTruthy();
    });
    when("I click on it", async () => {
      const href = el.getAttribute("href");
      await getRequest(String(href));
    });
    then(/^I am navigated to \/([a-z]+) page$/, async (page) => {
      expect(currentPage).toBe(`/${page}`);
    });
    when("page is loaded", parseResponseBody);
  });
});
