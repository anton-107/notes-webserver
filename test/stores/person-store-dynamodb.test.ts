import { DataMapper, QueryIterator } from "@aws/dynamodb-data-mapper";
import { anything, instance, mock, verify, when } from "ts-mockito";
import {
  PersonEntity,
  PersonStoreDynamodb,
} from "../../src/stores/person/person-store-dynamodb";

describe("PersonStoreDynamodb", () => {
  it("should add a person", async () => {
    const dataMapperMock = mock<DataMapper>();
    const store = new PersonStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    await store.add({
      id: "SomeShortID",
      manager: "testuser1",
      name: "Alice",
      email: "alice@mymail.com",
    });
    verify(dataMapperMock.put(anything())).called();
  });
  it("should throw an error if dynamodb mapper throws an error on adding", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.put(anything())).thenCall(() => {
      throw Error("this is a test error");
    });
    const store = new PersonStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    expect(async () => {
      await store.add({
        id: "SomeShortID",
        manager: "testuser1",
        name: "Alice",
        email: "alice@mymail.com",
      });
    }).rejects.toThrow();
  });
  it("should return a list of people", async () => {
    const dataMapperMock = mock<DataMapper>();
    const iterator = mock<QueryIterator<PersonEntity>>();
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
    const store = new PersonStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    const people = await store.listAll("testuser2");
    expect(people.length).toBe(1);
  });
  it("should throw an error if dynamodb mapper throws an error on querying", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.query(anything(), anything())).thenCall(() => {
      throw Error("this is a test error");
    });
    const store = new PersonStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    const people = await store.listAll("testuser1");
    expect(people.length).toBe(0);
  });
  it("should return null if dynamodb mapper throws an error on getting an item", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.get(anything())).thenCall(() => {
      throw Error("this is a test error");
    });
    const store = new PersonStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    const person = await store.getOne("testuser1", "sample-id");
    expect(person).toBe(null);
  });
  it("should return one person", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.get(anything())).thenResolve({
      id: "test-person1",
      manager: "user1",
      name: "Alice",
      email: "alice@mymail.com",
    });
    const store = new PersonStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    const person = await store.getOne("user1", "test-person1");
    expect(person.name).toBe("Alice");
  });
  it("should should throw an error if dynamodb mapper throws an error on deleting an item", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.delete(anything())).thenCall(() => {
      throw Error("this is a test error on delete");
    });
    const store = new PersonStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    expect(async () => {
      await store.deleteOne("user1", "test-person");
    }).rejects.toThrow("this is a test error on delete");
  });
  it("should should throw an error if dynamodb mapper throws an error on editing an item", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.update(anything())).thenCall(() => {
      throw Error("this is a test error on edit");
    });
    const store = new PersonStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    expect(async () => {
      await store.editOne({
        manager: "user1",
        name: "Alice",
        email: "alice@mymail.com",
        id: "test-person-id",
      });
    }).rejects.toThrow("this is a test error on edit");
  });
});
