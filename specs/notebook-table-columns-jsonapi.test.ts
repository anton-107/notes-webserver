import { defineFeature, loadFeature } from "jest-cucumber";

import { TestScenario } from "./test-scenario";

const feature = loadFeature("./specs/notebook-table-columns-jsonapi.feature");

defineFeature(feature, (test) => {
  const testScenario = new TestScenario(8148);
  afterAll(() => testScenario.stopServer());
  test("Listing a list of supported columns", ({ given, when, then }) => {
    given("web server is running", () => testScenario.startServer());
    given(
      /^I am logged in as '([A-z0-9]+)'\/'([A-z0-9]+)'$/,
      (user, password) => testScenario.loginAs(user, password)
    );

    when(
      /^I visit \/([a-z{}\-/]+) page$/,
      async (url) => await testScenario.loadPage(url)
    );

    when(
      "json response is loaded",
      async () => await testScenario.processJSON()
    );

    then(
      /^json query '([^']+)' returns value '([^']+)'$/,
      (query, fieldValue) => testScenario.checkJSONQuery(query, fieldValue)
    );

    then(
      /^json query '([^']+)' returns value '([^']+)'$/,
      (query, fieldValue) => testScenario.checkJSONQuery(query, fieldValue)
    );

    then(
      /^json query '([^']+)' returns value '([^']+)'$/,
      (query, fieldValue) => testScenario.checkJSONQuery(query, fieldValue)
    );

    then(
      /^json query '([^']+)' returns value '([^']+)'$/,
      (query, fieldValue) => testScenario.checkJSONQuery(query, fieldValue)
    );

    then(
      /^json query '([^']+)' returns value '([^']+)'$/,
      (query, fieldValue) => testScenario.checkJSONQuery(query, fieldValue)
    );

    then(
      /^json query '([^']+)' returns value '([^']+)'$/,
      (query, fieldValue) => testScenario.checkJSONQuery(query, fieldValue)
    );

    then(
      /^json query '([^']+)' returns value '([^']+)'$/,
      (query, fieldValue) => testScenario.checkJSONQuery(query, fieldValue)
    );
  });
});
