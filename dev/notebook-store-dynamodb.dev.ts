import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import { generate } from "short-uuid";

import {
  NotebookEntity,
  NotebookStoreDynamodb,
} from "./../src/stores/notebook/notebook-store-dynamodb";

const CREATE_TABLE_BEFORE_TESTS = false;
const DELETE_TABLE_AFTER_TESTS = false;

describe("NotebookStoreDynamodb: development test", () => {
  const mapper = new DataMapper({
    client: new DynamoDB(),
    tableNamePrefix: "dev_",
  });

  let notebookID = "";

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
    expect(notebooks.length).toBeGreaterThan(1);
    notebooks.sort((a, b) => a.name.localeCompare(b.name));
    expect(notebooks[0].name).toMatch(/^Notebook \d/);
    expect(notebooks[1].name).toMatch(/^Notebook \d/);
  });
  it("should fetch one item", async () => {
    const store = new NotebookStoreDynamodb({
      dataMapper: mapper,
    });
    const owner = `user2`;
    notebookID = generate();
    await store.add({
      id: notebookID,
      owner,
      name: "Notebook 3",
    });
    const notebook = await store.getOne(owner, notebookID);
    expect(notebook.name).toBe("Notebook 3");
  });
  it("should edit one item", async () => {
    const store = new NotebookStoreDynamodb({
      dataMapper: mapper,
    });
    const owner = `user2`;
    await store.editOne({
      id: notebookID,
      owner,
      name: "Notebook 3 (edited)",
    });
    const notebook = await store.getOne(owner, notebookID);
    expect(notebook.name).toBe("Notebook 3 (edited)");
  });
  it("should delete one item", async () => {
    const store = new NotebookStoreDynamodb({
      dataMapper: mapper,
    });
    const owner = `user3`;
    const id = generate();
    await store.add({
      id,
      owner,
      name: "Notebook 4",
    });
    let notebook = await store.getOne(owner, id);
    expect(notebook.name).toBe("Notebook 4");

    await store.deleteOne(owner, id);
    notebook = await store.getOne(owner, id);
    expect(notebook).toBe(null);
  });
});
