import { defineFeature, loadFeature } from "jest-cucumber";

import { TestScenario } from "./test-scenario";

const feature = loadFeature("./specs/person-crud-jsonapi.feature");

defineFeature(feature, (test) => {
  const testScenario = new TestScenario(8144);
  afterAll(() => testScenario.stopServer());
  test("Person creation via JSON API", ({ given, when, then, and }) => {
    given("web server is running", () => testScenario.startServer());
    given(
      /^I am logged in as '([A-z0-9]+)'\/'([A-z0-9]+)'$/,
      (user, password) => testScenario.loginAs(user, password)
    );
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
    then(/^'([a-z-]+)' field has value of '([^']+)'$/, (field, value) => {
      testScenario.checkJSONField(field, value);
    });
    then(/^'([a-z-]+)' field is a non-empty string$/, (field) => {
      testScenario.checkJSONFieldIsNonEmptyString(field);
    });
  });

  test("Reading added person via JSON API", ({ when, then, and }) => {
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
      /^its first element has field '([a-z-]+)' with value '([A-z0-9 ]+)'$/,
      (fieldName, fieldValue) =>
        testScenario.checkFirstListElement(fieldName, fieldValue)
    );
  });

  test("Edit person via JSON API", ({ when, then, and }) => {
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
    then(/^'([a-z-]+)' field has value of '([^']+)'$/, (field, value) => {
      testScenario.checkJSONField(field, value);
    });
  });
  test("Delete person via JSON API", ({ when, then, and }) => {
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
    then(
      /^I visit \/([a-z{}\-/]+) page$/,
      async (url) => await testScenario.loadPage(url)
    );
    when(
      "json response is loaded",
      async () => await testScenario.processJSON()
    );
    then(/^'([a-z-]+)' field is an empty list$/, (fieldName) =>
      testScenario.checkJSONFieldListIsEmpty(fieldName)
    );
  });
});
