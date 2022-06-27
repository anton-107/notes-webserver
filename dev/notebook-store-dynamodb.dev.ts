import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import {
  NotebookEntity,
  NotebookStoreDynamodb,
} from "./../src/stores/notebook-store-dynamodb";
import { generate } from "short-uuid";

const CREATE_TABLE_BEFORE_TESTS = true;
const DELETE_TABLE_AFTER_TESTS = true;

describe("NotebookStoreDynamodb: development test", () => {
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
      console.log("Creating a test notebooks table");
      await mapper.createTable(NotebookEntity, {
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
    console.log("Deleting a test notebooks table");
    await mapper.deleteTable(NotebookEntity);
  }, 30000);

  it("should create item", async () => {
    const store = new NotebookStoreDynamodb({
      dataMapper: mapper,
    });
    const username = `user1`;
    await store.add({
      id: generate(),
      owner: username,
      name: "Notebook 1",
    });
    await store.add({
      id: generate(),
      owner: username,
      name: "Notebook 2",
    });

    const notebooks = await store.listAll(username);
    expect(notebooks.length).toBe(2);
    expect(notebooks[0].name).toBe("Notebook 1");
    expect(notebooks[1].name).toBe("Notebook 2");
  });
  it("should fetch one item", async () => {
    const store = new NotebookStoreDynamodb({
      dataMapper: mapper,
    });
    const owner = `user2`;
    const id = generate();
    await store.add({
      id,
      owner,
      name: "Notebook 3",
    });
    const notebook = await store.getOne(owner, id);
    expect(notebook.name).toBe("Notebook 3");
  });
});
