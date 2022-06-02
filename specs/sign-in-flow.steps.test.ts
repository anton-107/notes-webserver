import { loadFeature, defineFeature } from "jest-cucumber";
import { TestScenario } from "./test-scenario";

const feature = loadFeature("./specs/sign-in-flow.feature");

defineFeature(feature, (test) => {
  test("Sucessful sign in for user1", ({ given, when, then, and }) => {
    const testScenario = new TestScenario(8135);
    afterAll(() => testScenario.stopServer());

    given("web server is running", () => testScenario.startServer());
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
    and(/^I focus on it and type '([A-z0-9]+)'$/, (value) =>
      testScenario.setInputValue(value)
    );
    and(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^I focus on it and type '([A-z0-9]+)'$/, (value) =>
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
    when(/^I visit \/([a-z]+) page$/, (url) => testScenario.loadPage(url));
    when("page is loaded", () => testScenario.processNewPage());
    then(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^I do not see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElementIsNotPresent(selector)
    );
    and(/^I do not see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElementIsNotPresent(selector)
    );
  });
});
