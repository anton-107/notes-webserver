import { defineFeature, loadFeature } from "jest-cucumber";
import { TestScenario } from "./test-scenario";

const feature = loadFeature("./specs/note-attachments-crud-jsonapi.feature");

defineFeature(feature, (test) => {
  const testScenario = new TestScenario(8146);
  afterAll(() => testScenario.stopServer());
  test("Reading a note attchment via API (binary response)", ({
    given,
    when,
    then,
  }) => {
    given("web server is running", () => testScenario.startServer());
    given(
      /^I am logged in as '([A-z0-9]+)'\/'([A-z0-9]+)'$/,
      (user, password) => testScenario.loginAs(user, password)
    );

    given(
      /^I own a notebook named '([A-z0-9 ]+)'$/,
      async (notebookName: string) => {
        await testScenario.createNotebook(notebookName);
      }
    );

    given(
      /^I own a note in that notebook with content '([A-z0-9 ]+)'$/,
      async (noteContent: string) => {
        await testScenario.createNote(noteContent);
      }
    );

    given(
      /^there is an attachment attached to that note with content '([A-z0-9 ]+)'$/,
      async (attachmentContent: string) => {
        await testScenario.createAttachment(attachmentContent);
      }
    );

    when(
      /^I visit \/([a-z{}\-/]+) page$/,
      async (url) => await testScenario.loadPage(url)
    );

    when(
      "binary response is loaded",
      async () => await testScenario.processBinaryResponse()
    );

    then(/^binary response is '([A-z0-9 ]+)'$/, (expectedResponse: string) => {
      testScenario.checkBinaryResponse(expectedResponse);
    });
  });
});
