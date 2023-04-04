import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import { Note } from "notes-model/dist/note-model";
import { generate } from "short-uuid";

import { LoggerBunyan } from "../src/logger/logger-bunyan";
import { NoteStoreDynamodb } from "../src/stores/note/note-store-dynamodb";

const SAMPLE_NOTEBOOK_ID = "16gZ3KwMfLGLWta9W3rf4q";

describe("NoteStoreDynamodb: development test", () => {
  const mapper = new DataMapper({
    client: new DynamoDB(),
    tableNamePrefix: "dev_",
  });
  const store = new NoteStoreDynamodb({
    dataMapper: mapper,
    logger: new LoggerBunyan(),
  });

  let capturedNote: Note | undefined = undefined;

  it("should create item", async () => {
    await store.add({
      id: generate(),
      notebookID: SAMPLE_NOTEBOOK_ID,
      owner: "user1",
      type: { type: "plaintext" },
      content: `This is a test note ${String(Math.random()).slice(2, 6)}`,
      extensionProperties: {
        personID: "test-person",
      },
    });
  });
  it("should list all notes", async () => {
    const notes = await store.listAll("user1");
    expect(notes.length > 0).toBe(true);
    expect(notes[0].content).toContain("This is");
  });
  it("should list all notes in notebook", async () => {
    const notes = await store.listAllInNotebook("user1", SAMPLE_NOTEBOOK_ID);
    expect(notes.length > 0).toBe(true);
    expect(notes[0].content).toContain("This is");
    capturedNote = notes[0];
  });
  it("should read one note", async () => {
    if (!capturedNote) {
      throw "Expected capturedNote to be defined";
    }
    const note = await store.getOne("user1", capturedNote.id);
    if (!note) {
      throw "Expected note to be defined";
    }
    expect(note.content).toBe(capturedNote.content);
    if (!note.extensionProperties) {
      throw "Expected note extensionProperties to be defined";
    }
    expect(note.extensionProperties.personID).toBe("test-person");
  });
  it("should update one note", async () => {
    if (!capturedNote) {
      throw "Expected capturedNote to be defined";
    }
    const note: Note = {
      ...(capturedNote as Note),
      content: `This is an edited note ${String(Math.random()).slice(2, 6)}`,
    };
    await store.editOne(note);
    const returnedNote = await store.getOne("user1", capturedNote.id);
    if (!returnedNote) {
      throw "Expected returnedNote to be defined";
    }
    expect(returnedNote.content).toContain("This is an edited note");
  });
  it("should delete one note", async () => {
    if (!capturedNote) {
      throw "Expected capturedNote to be defined";
    }
    await store.deleteOne("user1", capturedNote.id);
    const note = await store.getOne("user1", capturedNote.id);
    expect(note).toBe(null);
  });
  it("should delete all notes in a notebook", async () => {
    await store.add({
      id: generate(),
      notebookID: SAMPLE_NOTEBOOK_ID,
      owner: "user1",
      type: { type: "plaintext" },
      content: `This is a test note ${String(Math.random()).slice(2, 6)}`,
    });
    await store.add({
      id: generate(),
      notebookID: SAMPLE_NOTEBOOK_ID,
      owner: "user1",
      type: { type: "plaintext" },
      content: `This is a test note ${String(Math.random()).slice(2, 6)}`,
    });
    await store.add({
      id: generate(),
      notebookID: SAMPLE_NOTEBOOK_ID,
      owner: "user1",
      type: { type: "plaintext" },
      content: `This is a test note ${String(Math.random()).slice(2, 6)}`,
    });
    const notes = await store.listAllInNotebook("user1", SAMPLE_NOTEBOOK_ID);
    expect(notes.length).toBeGreaterThan(0);
    await store.deleteAllInNotebook("user1", SAMPLE_NOTEBOOK_ID);
    const notesAfterDeletion = await store.listAllInNotebook(
      "user1",
      SAMPLE_NOTEBOOK_ID
    );
    expect(notesAfterDeletion.length).toBe(0);
  });
});
