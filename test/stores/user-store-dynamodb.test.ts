import { mock, instance, verify, anything, when } from "ts-mockito";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import { UserStoreDynamodb } from "../../src/stores/user-store-dynamodb";

describe("UserStoreDynamodb", () => {
  it("should add a user", async () => {
    const dataMapperMock = mock<DataMapper>();
    const store = new UserStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    await store.addUser({
      username: "testuser1",
      passwordHash: "password-hash-1",
    });
    verify(dataMapperMock.put(anything())).called();
  });
  it("should throw an error if dynamodb mapper throws an error", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.put(anything())).thenCall(() => {
      throw Error("this is a test error");
    });
    const store = new UserStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    expect(async () => {
      await store.addUser({
        username: "testuser1",
        passwordHash: "password-hash-1",
      });
    }).rejects.toThrow();
  });
  it("should return a user", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.get(anything())).thenResolve({
      username: "testuser2",
      passwordHash: "password-hash-2",
    });
    const store = new UserStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    const user = await store.getUserByName("testuser2");
    expect(user.passwordHash).toBe("password-hash-2");
  });
  it("should return null when dynamodb mapper throws an error", async () => {
    const dataMapperMock = mock<DataMapper>();
    when(dataMapperMock.get(anything())).thenReject();
    const store = new UserStoreDynamodb({
      dataMapper: instance(dataMapperMock),
    });
    const user = await store.getUserByName("testuser2");
    expect(user).toBe(null);
  });
});
