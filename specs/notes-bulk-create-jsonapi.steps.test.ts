import { defineFeature, loadFeature } from "jest-cucumber";

import { TestScenario } from "./test-scenario";

const feature = loadFeature("./specs/notes-bulk-create-jsonapi.feature");

defineFeature(feature, (test) => {
  const testScenario = new TestScenario(8141);
  afterAll(() => testScenario.stopServer());
  test("Note creation in bulk via JSON API", ({ given, when, then, and }) => {
    given("web server is running", () => testScenario.startServer());
    given(
      /^I am logged in as '([A-z0-9]+)'\/'([A-z0-9]+)'$/,
      (user, password) => testScenario.loginAs(user, password)
    );
    given(/^I own a notebook named '([A-z0-9 ]+)'$/, async (notebookName) => {
      await testScenario.createNotebook(notebookName);
    });
    when(/^I create a JSON object: '([^']+)'$/, (json) => {
      testScenario.setJSONRequestBody(json);
    });
    and(/^I POST it to '([^']+)'$/, async (url) => {
      await testScenario.postJSON(url);
    });
    when(
      "json response is loaded",
      async () => await testScenario.processJSON()
    );
    then(/^returned status code is (\d+)$/, (expectedStatus: number) =>
      testScenario.checkResponseStatus(expectedStatus)
    );
    when(
      /^I visit \/([a-z{}\-/]+) page$/,
      async (url) => await testScenario.loadPage(url)
    );
    when(
      "json response is loaded",
      async () => await testScenario.processJSON()
    );
    then(/^'([a-z-]+)' field is a list$/, (fieldName) =>
      testScenario.captureJSONFieldList(fieldName)
    );
    and(/^json query '([^']+)' returns value '([^']+)'$/, (query, fieldValue) =>
      testScenario.checkJSONQuery(query, fieldValue)
    );
    and(/^json query '([^']+)' returns value '([^']+)'$/, (query, fieldValue) =>
      testScenario.checkJSONQuery(query, fieldValue)
    );
  });
});
