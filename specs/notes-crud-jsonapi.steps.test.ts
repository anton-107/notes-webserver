import { defineFeature, loadFeature } from "jest-cucumber";

import { TestScenario } from "./test-scenario";

const feature = loadFeature("./specs/notes-crud-jsonapi.feature");

defineFeature(feature, (test) => {
  const testScenario = new TestScenario(8141);
  afterAll(() => testScenario.stopServer());
  test("Note creation via JSON API", ({ given, when, then, and }) => {
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

  test("Reading added note via JSON API", ({ when, then, and }) => {
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
    and(/^json query '([^']+)' returns value '([^']+)'$/, (query, fieldValue) =>
      testScenario.checkJSONQuery(query, fieldValue)
    );
  });
  test("Edit note via JSON API", ({ when, then, and }) => {
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
  });
  test("Move note to a section via JSON API", ({ when, then, and }) => {
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
    and(/^json query '([^']+)' returns value '([^']+)'$/, (query, fieldValue) =>
      testScenario.checkJSONQuery(query, fieldValue)
    );
  });
  test("Set note order  via JSON API", ({ when, then, and }) => {
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
    and(/^json query '([^']+)' returns value (\d)$/, (query, fieldValue) =>
      testScenario.checkJSONQuery(query, Number(fieldValue))
    );
  });
  test("Set due date via JSON API", ({ when, then, and }) => {
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
    and(/^json query '([^']+)' returns value '([^']+)'$/, (query, fieldValue) =>
      testScenario.checkJSONQuery(query, fieldValue)
    );
  });
  test("Delete note via JSON API", ({ when, then, and }) => {
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
