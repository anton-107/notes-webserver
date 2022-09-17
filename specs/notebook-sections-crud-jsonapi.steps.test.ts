import { defineFeature, loadFeature } from "jest-cucumber";
import { TestScenario } from "./test-scenario";

const feature = loadFeature("./specs/notebook-sections-crud-jsonapi.feature");

defineFeature(feature, (test) => {
  const testScenario = new TestScenario(8143);
  afterAll(() => testScenario.stopServer());
  test("Notebook section creation via JSON API", ({
    given,
    when,
    then,
    and,
  }) => {
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
    then(/^'([a-z-]+)' field has value of '([A-z0-9 ]+)'$/, (field, value) => {
      testScenario.checkJSONField(field, value);
    });
    then(/^'([a-z-]+)' field is a non-empty string$/, (field) => {
      testScenario.checkJSONFieldIsNonEmptyString(field);
    });
  });
  test("Reading added notebook section via JSON API", ({ when, then, and }) => {
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
    and(
      /^json query '([^']+)' returns value '([^']+)'$/,
      (jsonQueryString, expectedReturnedValue) =>
        testScenario.checkJSONQuery(jsonQueryString, expectedReturnedValue)
    );
  });
});
