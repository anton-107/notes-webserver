import { DataMapper, QueryIterator } from "@aws/dynamodb-data-mapper";
import { anything, instance, mock, verify, when } from "ts-mockito";
import {
  NotebookEntity,
  NotebookStoreDynamodb,
} from "./../../src/stores/notebook-store-dynamodb";

describe("NotebookStoreDynamodb", () => {
  it("should add a notebook", async () => {
    const dataMapperMock = mock<DataMapper>();
    const store = new NotebookStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    await store.add({
      id: "SomeShortID",
      owner: "testuser1",
      name: "Notebook 1",
    });
    verify(dataMapperMock.put(anything())).called();
  });
  it("should throw an error if dynamodb mapper throws an error on adding", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.put(anything())).thenCall(() => {
      throw Error("this is a test error");
    });
    const store = new NotebookStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    expect(async () => {
      await store.add({
        id: "SomeShortID",
        owner: "testuser1",
        name: "notebook 1",
      });
    }).rejects.toThrow();
  });
  it("should return a list of notebooks", async () => {
    const dataMapperMock = mock<DataMapper>();
    const iterator = mock<QueryIterator<NotebookEntity>>();
    when(iterator[Symbol.asyncIterator]).thenCall(() => {
      console.log("Symbol is called");
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
      dataMapper: instance(dataMapperMock),
    });
    const notebooks = await store.listAll("testuser1");
    expect(notebooks.length).toBe(0);
  });
  it("should should implement getOne method (but doesn't yet)", async () => {
    // todo: implement the method and test
    const dataMapperMock = mock<DataMapper>();
    const store = new NotebookStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    expect(
      async () => await store.getOne("user", "notebook")
    ).rejects.toThrow();
  });
});
