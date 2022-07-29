import { defineFeature, loadFeature } from "jest-cucumber";
import { TestScenario } from "./test-scenario";

const feature = loadFeature("./specs/notes-personal-date-range.feature");

defineFeature(feature, (test) => {
  const testScenario = new TestScenario(8140);
  afterAll(() => testScenario.stopServer());
  test("Personal date range note creation", ({ given, when, then, and }) => {
    given("web server is running", () => testScenario.startServer());
    given(
      /^I am logged in as '([A-z0-9]+)'\/'([A-z0-9]+)'$/,
      (user, password) => testScenario.loginAs(user, password)
    );
    given(/^I own a notebook named '([A-z0-9 ]+)'$/, async (notebookName) => {
      await testScenario.createNotebook(notebookName);
    });
    when("I navigate to this notebook page", async () => {
      await testScenario.navigateToNotebookPage();
    });
    when("page is loaded", () => testScenario.processNewPage());
    then(/^I see '([a-z-]+)' element$/, (selector) =>
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
    and(/^I focus on it and select '([A-z ]+)'$/, (optionName) =>
      testScenario.setSelectedOption(optionName)
    );
    and(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^I focus on it and type '([0-9-]+)'$/, (value) =>
      testScenario.setInputValue(value)
    );
    and(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^I focus on it and type '([0-9-]+)'$/, (value) =>
      testScenario.setInputValue(value)
    );
    and(/^I press 'Enter' on keyboard$/, () => testScenario.submitForm());
    then(/^I am navigated to \/([a-z-{}/]+) page$/, (url) =>
      testScenario.checkCurrentPage(url)
    );
  });
  test("Read added personal date range entry", ({ when, then, and }) => {
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
    and(/^it has inner text of '(.+)'$/, (innerText) =>
      testScenario.checkInnerText(innerText)
    );
    and(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^it has inner text of '(.+)'$/, (innerText) =>
      testScenario.checkInnerText(innerText)
    );
    and(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
  });
  test("Edit note", ({ when, then, and }) => {
    when("I click on it", () => testScenario.handleClick());
    then(/^I am navigated to \/([a-z-{}/]+) page$/, (url) =>
      testScenario.checkCurrentPage(url)
    );
    when("page is loaded", () => testScenario.processNewPage());
    then(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^it has selected option of '([A-z0-9 ]+)'$/, (value) =>
      testScenario.checkSelectedOption(value)
    );
    and(/^I focus on it and select '([A-z0-9 ]+)'$/, (value) =>
      testScenario.setSelectedOption(value)
    );
    and(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^it has value of '([A-z0-9- ]+)'$/, (value) =>
      testScenario.checkValue(value)
    );
    and(/^I focus on it and type '([0-9-]+)'$/, (value) =>
      testScenario.setInputValue(value)
    );
    and(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^it has value of '([A-z0-9- ]+)'$/, (value) =>
      testScenario.checkValue(value)
    );
    and(/^I focus on it and type '([0-9-]+)'$/, (value) =>
      testScenario.setInputValue(value)
    );
    and(/^I press 'Enter' on keyboard$/, () => testScenario.submitForm());
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
    and(/^it has inner text of '(.+)'$/, (innerText) =>
      testScenario.checkInnerText(innerText)
    );
    and(/^I see '([a-z-]+)' element$/, (selector) =>
      testScenario.checkElement(selector)
    );
    and(/^it has inner text of '(.+)'$/, (innerText) =>
      testScenario.checkInnerText(innerText)
    );
  });
});
