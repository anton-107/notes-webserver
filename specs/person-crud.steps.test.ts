import { defineFeature, loadFeature } from "jest-cucumber";

import { TestScenario } from "./test-scenario";
const feature = loadFeature("./specs/person-crud.feature");

defineFeature(feature, (test) => {
  const testScenario = new TestScenario(8137);
  afterAll(() => testScenario.stopServer());

  test("Add a person", ({ given, when, then, and }) => {
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
    then(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^I focus on it and type '([A-z0-9@. ]+)'$/, (value) =>
      testScenario.setInputValue(value)
    );
    and(/^I press 'Enter' on keyboard$/, () => testScenario.submitForm());
    then(/^I am navigated to \/([a-z-]+) page$/, (url) =>
      testScenario.checkCurrentPage(url)
    );
  });
  test("Read added person details", ({ when, then, and }) => {
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
  });
  test("Edit details for person", ({ and, when, then }) => {
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
    and(/^I focus on it and type '([A-z0-9 ,.]+)'$/, (value) =>
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
  test("Person deletion", ({ when, then }) => {
    when("I click on it", () => testScenario.handleClick());
    then(/^I am navigated to \/([a-z-{}/]+) page$/, (url) =>
      testScenario.checkCurrentPage(url)
    );
    when("page is loaded", () => testScenario.processNewPage());
    then(/^I see '([a-z-]+)' element$/, (selector) =>
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
