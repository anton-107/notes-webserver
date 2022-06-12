"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
const aws_sdk_1 = require("aws-sdk");
const user_store_dynamodb_1 = require("../stores/user-store-dynamodb");
const CREATE_TABLE_BEFORE_TESTS = false;
const DELETE_TABLE_AFTER_TESTS = false;
describe("UserStoreDynamodb: development test", () => {
    const mapper = new dynamodb_data_mapper_1.DataMapper({
        client: new aws_sdk_1.DynamoDB(),
        tableNamePrefix: "dev_",
    });
    beforeAll(async function () {
        if (!CREATE_TABLE_BEFORE_TESTS) {
            console.log("Skipping creating the test table");
            return;
        }
        try {
            console.log("Creating a test users table");
            await mapper.createTable(user_store_dynamodb_1.UserEntity, {
                readCapacityUnits: 1,
                writeCapacityUnits: 1,
            });
        }
        catch (err) {
            console.warn("Error creating a table: ", err);
        }
    }, 30000);
    afterAll(async () => {
        if (!DELETE_TABLE_AFTER_TESTS) {
            console.log("Skipping deleting the test table");
            return;
        }
        console.log("Deleting a test users table");
        await mapper.deleteTable(user_store_dynamodb_1.UserEntity);
    }, 20000);
    it("should create item", async () => {
        const store = new user_store_dynamodb_1.UserStoreDynamodb({
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
//# sourceMappingURL=user-store-dynamodb.dev.js.map