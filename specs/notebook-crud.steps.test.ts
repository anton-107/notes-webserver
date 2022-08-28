import { defineFeature, loadFeature } from "jest-cucumber";
import { TestScenario } from "./test-scenario";
const feature = loadFeature("./specs/notebook-crud.feature");

defineFeature(feature, (test) => {
  const testScenario = new TestScenario(8136);
  afterAll(() => testScenario.stopServer());

  test("Notebook creation", ({ given, when, then, and }) => {
    given("web server is running", () => testScenario.startServer());
    given(
      /^I am logged in as '([A-z0-9]+)'\/'([A-z0-9]+)'$/,
      (user, password) => testScenario.loginAs(user, password)
    );
    when(/^I visit \/([a-z]+) page$/, (url) => testScenario.loadPage(url));
    when("page is loaded", () => testScenario.processNewPage());
    then(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    when("I click on it", () => testScenario.handleClick());
    then(/^I am navigated to \/([a-z-]+) page$/, (url) =>
      testScenario.checkCurrentPage(url)
    );
    when("page is loaded", () => testScenario.processNewPage());
    then(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^I focus on it and type '([A-z0-9 ]+)'$/, (value) =>
      testScenario.setInputValue(value)
    );
    and(/^I press 'Enter' on keyboard$/, () => testScenario.submitForm());
    then(/^I am navigated to \/([a-z-]+) page$/, (url) =>
      testScenario.checkCurrentPage(url)
    );
    when("page is loaded", () => testScenario.processNewPage());
    then(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^it has inner text of '(.+)'$/, (innerText) =>
      testScenario.checkInnerText(innerText)
    );
  });
  test("Notebook json endpoints", ({ when, then, and }) => {
    when(
      /^I visit \/([a-z]+) page$/,
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
    and(/^its first element has field '([A-z-]+)' with a url$/, (fieldName) =>
      testScenario.captureURLFromFirstListElement(fieldName)
    );
    when("I load JSON from that url", async () => {
      await testScenario.loadJSONURL();
    });
    when("json response is loaded", () => testScenario.processJSON());
    then(/^'([a-z-]+)' field has value of '([A-z0-9 ]+)'$/, (field, value) => {
      testScenario.checkJSONField(field, value);
    });
  });

  test("Notebook edit and deletion", ({ when, then, and }) => {
    when(/^I visit \/([a-z]+) page$/, (url) => testScenario.loadPage(url));
    when("page is loaded", () => testScenario.processNewPage());
    then(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^it has inner text of '(.+)'$/, (innerText) =>
      testScenario.checkInnerText(innerText)
    );
    when("I click on it", () => testScenario.handleClick());
    then(/^I am navigated to \/([a-z-{}/]+) page$/, (url) =>
      testScenario.checkCurrentPage(url)
    );
    when("page is loaded", () => testScenario.processNewPage());
    then(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^it has inner text of '(.+)'$/, (innerText) =>
      testScenario.checkInnerText(innerText)
    );

    and(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    when("I click on it", () => testScenario.handleClick());
    then(/^I am navigated to \/([a-z-{}/]+) page$/, (url) =>
      testScenario.checkCurrentPage(url)
    );
    when("page is loaded", () => testScenario.processNewPage());
    then(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and("i focus on it and clear its value", () => {
      testScenario.setInputValue("");
    });
    and(/^I focus on it and type '([A-z0-9 ,]+)'$/, (value) =>
      testScenario.setInputValue(value)
    );
    and(/^I press 'Enter' on keyboard$/, () => testScenario.submitForm());
    then(/^I am navigated to \/([a-z-]+) page$/, (url) =>
      testScenario.checkCurrentPage(url)
    );
    when("page is loaded", () => testScenario.processNewPage());
    then(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^it has inner text of '(.+)'$/, (innerText) =>
      testScenario.checkInnerText(innerText)
    );
    when("I click on it", () => testScenario.handleClick());
    then(/^I am navigated to \/([a-z-{}/]+) page$/, (url) =>
      testScenario.checkCurrentPage(url)
    );
    when("page is loaded", () => testScenario.processNewPage());
    then(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^it has inner text of '(.+)'$/, (innerText) =>
      testScenario.checkInnerText(innerText)
    );

    and(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    when("I click on it", () => testScenario.handleClick());
    then(/^I am navigated to \/([a-z-{}/]+) page$/, (url) =>
      testScenario.checkCurrentPage(url)
    );
    when("page is loaded", () => testScenario.processNewPage());
    then(/^I do not see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElementIsNotPresent(selector)
    );
  });
});
