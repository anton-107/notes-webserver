import { defineFeature, loadFeature } from "jest-cucumber";
import { TestScenario } from "./test-scenario";

const feature = loadFeature("./specs/note-attachments-crud-jsonapi.feature");

defineFeature(feature, (test) => {
  const testScenario = new TestScenario(8146);
  afterAll(() => testScenario.stopServer());
  test("Reading a note attachment via API (binary response)", ({
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
      /^there is an attachment attached to that note with content '([A-z0-9 ]+)' and name '([A-z0-9 ]+)'$/,
      async (attachmentContent: string, attachmentName: string) => {
        await testScenario.createAttachment(attachmentName, attachmentContent);
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
  test("Listing all attachments for a note", ({ when, then }) => {
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
  });
});
