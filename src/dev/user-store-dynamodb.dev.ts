import { DataMapper } from "@aws/dynamodb-data-mapper"
import { DynamoDB } from "aws-sdk"
import { UserStoreDynamodb } from "../stores/user-store-dynamodb"
import { TemporaryTable } from "./temporary-table";

describe("UserStoreDynamodb: development test", () => {
  const table = new TemporaryTable();

  it("should create item", async () => {
    const store = new UserStoreDynamodb({
      dataMapper: new DataMapper({
        client: new DynamoDB()
      })
    });
    await store.addUser({
      username: 'testuser1',
      passwordHash: 'passwordHash1'
    });
  })
});