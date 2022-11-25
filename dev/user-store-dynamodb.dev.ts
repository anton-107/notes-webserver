import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";

import { dependenciesConfiguration } from "../src/configuration/configuration";
import {
  UserEntity,
  UserStoreDynamodb,
} from "../src/stores/user-store-dynamodb";

const CREATE_TABLE_BEFORE_TESTS = false;
const DELETE_TABLE_AFTER_TESTS = false;

const config = dependenciesConfiguration({});
const logger = config.logger;

describe("UserStoreDynamodb: development test", () => {
  const mapper = new DataMapper({
    client: new DynamoDB(),
    tableNamePrefix: "dev_",
  });

  beforeAll(async function () {
    if (!CREATE_TABLE_BEFORE_TESTS) {
      logger.info("Skipping creating the test table");
      return;
    }
    try {
      logger.info("Creating a test users table");
      await mapper.createTable(UserEntity, {
        readCapacityUnits: 1,
        writeCapacityUnits: 1,
      });
    } catch (err) {
      logger.error("Error creating a table: ", { error: err });
    }
  }, 30000);
  afterAll(async () => {
    if (!DELETE_TABLE_AFTER_TESTS) {
      logger.info("Skipping deleting the test table");
      return;
    }
    logger.info("Deleting a test users table");
    await mapper.deleteTable(UserEntity);
  }, 20000);

  it("should create item", async () => {
    const store = new UserStoreDynamodb({
      dataMapper: mapper,
    });
    const username = `user1`;
    await store.addUser({
      username,
      passwordHash: "passwordHash1",
    });

    const user = await store.getUserByName(username);
    expect(user.username).toBe(username);
  });
});
