import { defineFeature, loadFeature } from "jest-cucumber";

import { TestScenario } from "./test-scenario";

const feature = loadFeature("./specs/search-jsonapi.feature");

defineFeature(feature, (test) => {
  const testScenario = new TestScenario(8147);
  afterAll(() => testScenario.stopServer());
  test("Search via JSON API", ({ given, when, then }) => {
    given("web server is running", () => testScenario.startServer());
    given(
      /^I am logged in as '([A-z0-9]+)'\/'([A-z0-9]+)'$/,
      (user, password) => testScenario.loginAs(user, password)
    );
    given(/^I own a notebook named '([A-z0-9 ]+)'$/, async (notebookName) => {
      await testScenario.createNotebook(notebookName);
    });
    given(
      /^I own a note in that notebook with content '([A-z0-9 ]+)'$/,
      async (noteContent: string) => {
        await testScenario.createNote(noteContent);
      }
    );
    when(
      /^I visit \/([a-z{}\-/?=]+) page$/,
      async (url) => await testScenario.loadPage(url)
    );
    when(
      "json response is loaded",
      async () => await testScenario.processJSON()
    );
    then(/^'([a-z-]+)' field is a list$/, (fieldName) =>
      testScenario.captureJSONFieldList(fieldName)
    );
  });
});
