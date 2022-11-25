import { DataMapper, QueryIterator } from "@aws/dynamodb-data-mapper";
import { anything, instance, mock, verify, when } from "ts-mockito";

import { LoggerBunyan } from "../../../src/logger/logger-bunyan";
import {
  NoteAttachmentEntity,
  NoteAttachmentsStoreDynamodb,
} from "../../../src/stores/note/note-attachments-store-dynamodb";

const logger = new LoggerBunyan();

describe("NoteAttachmentsStoreDynamodb", () => {
  it("should add an attachment", async () => {
    const dataMapperMock = mock<DataMapper>();
    const store = new NoteAttachmentsStoreDynamodb({
      logger,
      dataMapper: instance(dataMapperMock),
    });
    await store.add({
      id: "SomeShortID",
      owner: "testuser1",
      noteID: "note-1",
      name: "Video subtitles (lang=en)",
      objectKey: "attachments/attachment-1",
      fileExtension: "xml",
      createdAt: "2022-11-16T21:29:00Z",
    });
    verify(dataMapperMock.put(anything())).called();
  });
  it("should throw an error if dynamodb mapper throws an error on adding", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.put(anything())).thenCall(() => {
      throw Error("this is a test error");
    });
    const store = new NoteAttachmentsStoreDynamodb({
      logger,
      dataMapper: instance(dataMapperMock),
    });
    expect(async () => {
      await store.add({
        id: "SomeShortID",
        owner: "testuser1",
        noteID: "note-1",
        name: "Video subtitles (lang=en)",
        objectKey: "attachments/attachment-1",
        fileExtension: "xml",
        createdAt: "2022-11-16T21:29:00Z",
      });
    }).rejects.toThrow();
  });
  it("should return a list of all attachments for a note", async () => {
    const dataMapperMock = mock<DataMapper>();
    const iterator = mock<QueryIterator<NoteAttachmentEntity>>();
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
    const store = new NoteAttachmentsStoreDynamodb({
      logger,
      dataMapper: instance(dataMapperMock),
    });
    const notes = await store.listAllForNote("testuser2", "note-id");
    expect(notes.length).toBe(1);
  });
  it("should throw an error if dynamodb mapper throws an error on querying", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.query(anything(), anything())).thenCall(() => {
      throw Error("this is a test error");
    });
    const store = new NoteAttachmentsStoreDynamodb({
      logger,
      dataMapper: instance(dataMapperMock),
    });
    const attachments = await store.listAllForNote("testuser1", "notebook-id");
    expect(attachments.length).toBe(0);
  });
});
