import { DataMapper, QueryIterator } from "@aws/dynamodb-data-mapper";
import { anything, instance, mock, verify, when } from "ts-mockito";

import { LoggerBunyan } from "../../src/logger/logger-bunyan";
import {
  NotebookEntity,
  NotebookStoreDynamodb,
} from "./../../src/stores/notebook/notebook-store-dynamodb";

const logger = new LoggerBunyan();

describe("NotebookStoreDynamodb", () => {
  it("should add a notebook", async () => {
    const dataMapperMock = mock<DataMapper>();
    const store = new NotebookStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    await store.add({
      id: "SomeShortID",
      owner: "testuser1",
      name: "Notebook 1",
      sections: [],
      tableColumns: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "",
    });
    verify(dataMapperMock.put(anything())).called();
  });
  it("should throw an error if dynamodb mapper throws an error on adding", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.put(anything())).thenCall(() => {
      throw Error("this is a test error");
    });
    const store = new NotebookStoreDynamodb({
      logger,
      dataMapper: instance(dataMapperMock),
    });
    expect(async () => {
      await store.add({
        id: "SomeShortID",
        owner: "testuser1",
        name: "notebook 1",
        sections: [],
        tableColumns: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "",
      });
    }).rejects.toThrow();
  });
  it("should return a list of notebooks", async () => {
    const dataMapperMock = mock<DataMapper>();
    const iterator = mock<QueryIterator<NotebookEntity>>();
    when(iterator[Symbol.asyncIterator]).thenCall(() => {
      let callsCount = 0;
      return {
        next() {
          callsCount += 1;
          if (callsCount === 1) {
            return {
              done: false,
              value: [{ name: "test" }],
            };
          }
          return { done: true };
        },
      };
    });
    when(dataMapperMock.query(anything(), anything())).thenReturn(
      instance(iterator)
    );
    const store = new NotebookStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    const notebooks = await store.listAll("testuser2");
    expect(notebooks.length).toBe(1);
  });
  it("should throw an error if dynamodb mapper throws an error on querying", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.query(anything(), anything())).thenCall(() => {
      throw Error("this is a test error");
    });
    const store = new NotebookStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    const notebooks = await store.listAll("testuser1");
    expect(notebooks.length).toBe(0);
  });
  it("should return null if dynamodb mapper throws an error on getting an item", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.get(anything())).thenCall(() => {
      throw Error("this is a test error");
    });
    const store = new NotebookStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    const notebook = await store.getOne("testuser1", "sample-id");
    expect(notebook).toBe(null);
  });
  it("should return one notebook", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.get(anything())).thenResolve({
      id: "test-notebook",
      owner: "user1",
      name: "My notebook",
    });
    const store = new NotebookStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    const notebook = await store.getOne("user1", "test-notebook");
    if (notebook === null) {
      throw Error("unexpectedly got a null notebook from store");
    }
    expect(notebook.name).toBe("My notebook");
  });
  it("should should throw an error if dynamodb mapper throws an error on deleting an item", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.delete(anything())).thenCall(() => {
      throw Error("this is a test error on delete");
    });
    const store = new NotebookStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    expect(async () => {
      await store.deleteOne("user1", "test-notebook");
    }).rejects.toThrow("this is a test error on delete");
  });
  it("should should throw an error if dynamodb mapper throws an error on editing an item", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.update(anything())).thenCall(() => {
      throw Error("this is a test error on edit");
    });
    const store = new NotebookStoreDynamodb({
      logger: new LoggerBunyan(),
      dataMapper: instance(dataMapperMock),
    });
    expect(async () => {
      await store.editOne({
        owner: "user1",
        name: "test-notebook",
        id: "test-notebook-id",
        sections: [],
        tableColumns: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "",
      });
    }).rejects.toThrow("this is a test error on edit");
  });
});
