import { defineFeature, loadFeature } from "jest-cucumber";
import { TestScenario } from "./test-scenario";

const feature = loadFeature("./specs/notebook-crud-jsonapi.feature");

defineFeature(feature, (test) => {
  const testScenario = new TestScenario(8142);
  afterAll(() => testScenario.stopServer());
  test("Notebook creation via JSON API", ({ given, when, then, and }) => {
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

    then(/^'([a-z-]+)' field is a non-empty string$/, (field) => {
      testScenario.checkJSONFieldIsNonEmptyString(field);
    });
  });

  test("Reading added notebook via JSON API", ({ when, then, and }) => {
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
    and(
      /^its first element has field '([A-z-]+)' with a date value$/,
      (fieldName) =>
        testScenario.checkFirstListElementForPattern(
          fieldName,
          /\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ/
        )
    );
    and(
      /^its first element has field '([A-z-]+)' with a date value$/,
      (fieldName) =>
        testScenario.checkFirstListElementForPattern(
          fieldName,
          /\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ/
        )
    );
  });

  test("Edit notebook via JSON API", ({ when, then, and }) => {
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
      /^'([a-z-]+)' field has value of '([A-z0-9 ()]+)'$/,
      (field, value) => {
        testScenario.checkJSONField(field, value);
      }
    );
  });

  test("Read a list of available columns for the table view", ({
    when,
    then,
    and,
  }) => {
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

  test("Add table column via JSON API", ({ when, then, and }) => {
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
    then(/^json query '([^']+)' returns value '([^']+)'$/, (query, value) => {
      testScenario.checkJSONQuery(query, value);
    });
    and(/^json query '([^']+)' returns value '([^']+)'$/, (query, value) => {
      testScenario.checkJSONQuery(query, value);
    });
  });
  test("Delete notebook via JSON API", ({ when, then, and }) => {
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
