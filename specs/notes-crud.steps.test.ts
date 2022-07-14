import { defineFeature, loadFeature } from "jest-cucumber";
import { TestScenario } from "./test-scenario";

const feature = loadFeature("./specs/notes-crud.feature");

defineFeature(feature, (test) => {
  test("Note creation", ({ given, when, then }) => {
    const testScenario = new TestScenario(8138);
    afterAll(() => testScenario.stopServer());

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
  });
});
