import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import {
  UserStoreDynamodb,
  UserEntity,
} from "../src/stores/user-store-dynamodb";

const CREATE_TABLE_BEFORE_TESTS = false;
const DELETE_TABLE_AFTER_TESTS = false;

describe("UserStoreDynamodb: development test", () => {
  const mapper = new DataMapper({
    client: new DynamoDB(),
    tableNamePrefix: "dev_",
  });

  beforeAll(async function () {
    if (!CREATE_TABLE_BEFORE_TESTS) {
      console.log("Skipping creating the test table");
      return;
    }
    try {
      console.log("Creating a test users table");
      await mapper.createTable(UserEntity, {
        readCapacityUnits: 1,
        writeCapacityUnits: 1,
      });
    } catch (err) {
      console.warn("Error creating a table: ", err);
    }
  }, 30000);
  afterAll(async () => {
    if (!DELETE_TABLE_AFTER_TESTS) {
      console.log("Skipping deleting the test table");
      return;
    }
    console.log("Deleting a test users table");
    await mapper.deleteTable(UserEntity);
  }, 20000);

  it("should create item", async () => {
    const store = new UserStoreDynamodb({
      dataMapper: mapper,
    });
    const username = `testuser1_${Math.random()}`;
    await store.addUser({
      username,
      passwordHash: "passwordHash1",
    });

    const user = await store.getUserByName(username);
    expect(user.username).toBe(username);
  });
});
