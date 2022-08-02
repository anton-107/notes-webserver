import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import { generate } from "short-uuid";
import { Note } from "../src/model/note-model";
import { NoteStoreDynamodb } from "../src/stores/note/note-store-dynamodb";

const SAMPLE_NOTEBOOK_ID = "16gZ3KwMfLGLWta9W3rf4q";

describe("NoteStoreDynamodb: development test", () => {
  const mapper = new DataMapper({
    client: new DynamoDB(),
    tableNamePrefix: "dev_",
  });
  const store = new NoteStoreDynamodb({
    dataMapper: mapper,
  });

  let capturedNote: Note | undefined = undefined;

  it("should create item", async () => {
    await store.add({
      id: generate(),
      notebook: { id: SAMPLE_NOTEBOOK_ID, owner: "", name: "" },
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
    const note = await store.getOne("user1", capturedNote.id);
    expect(note.content).toBe(capturedNote.content);
    expect(note.extensionProperties.personID).toBe("test-person");
  });
  it("should update one note", async () => {
    let note = {
      ...capturedNote,
      content: `This is an edited note ${String(Math.random()).slice(2, 6)}`,
    };
    await store.editOne(note);
    note = await store.getOne("user1", capturedNote.id);
    expect(note.content).toContain("This is an edited note");
  });
  it("should delete one note", async () => {
    await store.deleteOne("user1", capturedNote.id);
    const note = await store.getOne("user1", capturedNote.id);
    expect(note).toBe(null);
  });
});
