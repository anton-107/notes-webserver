import { DataMapper, QueryIterator } from "@aws/dynamodb-data-mapper";
import { anything, instance, mock, verify, when } from "ts-mockito";

import {
  NoteEntity,
  NoteStoreDynamodb,
} from "../../../src/stores/note/note-store-dynamodb";
import { LoggerBunyan } from "./../../../src/logger/logger-bunyan";

describe("NoteStoreDynamodb", () => {
  it("should add a note", async () => {
    const dataMapperMock = mock<DataMapper>();
    const store = new NoteStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    await store.add({
      id: "SomeShortID",
      owner: "testuser1",
      content: "Test note",
      type: { type: "" },
      notebookID: "",
    });
    verify(dataMapperMock.put(anything())).called();
  });
  it("should throw an error if dynamodb mapper throws an error on adding", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.put(anything())).thenCall(() => {
      throw Error("this is a test error");
    });
    const store = new NoteStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    expect(async () => {
      await store.add({
        id: "SomeShortID",
        owner: "testuser1",
        content: "Test note",
        type: { type: "" },
        notebookID: "",
      });
    }).rejects.toThrow();
  });
  it("should return a list of notes", async () => {
    const dataMapperMock = mock<DataMapper>();
    const iterator = mock<QueryIterator<NoteEntity>>();
    when(iterator[Symbol.asyncIterator]).thenCall(() => {
      let callsCount = 0;
      return {
        next() {
          callsCount += 1;
          if (callsCount === 1) {
            return {
              done: false,
              value: [{ content: "test" }],
            };
          }
          return { done: true };
        },
      };
    });
    when(dataMapperMock.query(anything(), anything())).thenReturn(
      instance(iterator)
    );
    const store = new NoteStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    const notes = await store.listAll("testuser2");
    expect(notes.length).toBe(1);
  });
  it("should return a list of all notes in notebook", async () => {
    const dataMapperMock = mock<DataMapper>();
    const iterator = mock<QueryIterator<NoteEntity>>();
    when(iterator[Symbol.asyncIterator]).thenCall(() => {
      let callsCount = 0;
      return {
        next() {
          callsCount += 1;
          if (callsCount === 1) {
            return {
              done: false,
              value: [{ content: "test" }],
            };
          }
          return { done: true };
        },
      };
    });
    when(dataMapperMock.query(anything(), anything())).thenReturn(
      instance(iterator)
    );
    const store = new NoteStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    const notes = await store.listAllInNotebook("testuser2", "notebook-id");
    expect(notes.length).toBe(1);
  });
  it("should throw an error if dynamodb mapper throws an error on querying", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.query(anything(), anything())).thenCall(() => {
      throw Error("this is a test error");
    });
    const store = new NoteStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    let notes = await store.listAll("testuser1");
    expect(notes.length).toBe(0);
    notes = await store.listAllInNotebook("testuser1", "notebook-id");
    expect(notes.length).toBe(0);
  });
  it("should return null if dynamodb mapper throws an error on getting an item", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.get(anything())).thenCall(() => {
      throw Error("this is a test error");
    });
    const store = new NoteStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    const note = await store.getOne("testuser1", "sample-id");
    expect(note).toBe(null);
  });
  it("should return one note", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.get(anything())).thenResolve({
      id: "SomeShortID",
      owner: "testuser1",
      content: "Test note",
      type: { type: "" },
      notebookID: "",
    });
    const store = new NoteStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    const note = await store.getOne("user1", "test-note");
    if (!note) {
      throw "Unexpectedly got a null object from store";
    }
    expect(note.content).toBe("Test note");
  });
  it("should should throw an error if dynamodb mapper throws an error on deleting an item", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.delete(anything())).thenCall(() => {
      throw Error("this is a test error on delete");
    });
    const store = new NoteStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    expect(async () => {
      await store.deleteOne("user1", "test-note");
    }).rejects.toThrow("this is a test error on delete");
  });
  it("should should throw an error if dynamodb mapper throws an error on editing an item", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.update(anything())).thenCall(() => {
      throw Error("this is a test error on edit");
    });
    const store = new NoteStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    expect(async () => {
      await store.editOne({
        id: "SomeShortID",
        owner: "testuser1",
        content: "Test note",
        type: { type: "" },
        notebookID: "",
      });
    }).rejects.toThrow("this is a test error on edit");
  });
});
