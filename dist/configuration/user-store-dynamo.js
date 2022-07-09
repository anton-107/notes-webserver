"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStoreDynamoConfiguration = void 0;
const dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
const aws_sdk_1 = require("aws-sdk");
const user_store_dynamodb_1 = require("../stores/user/user-store-dynamodb");
const userStoreDynamoConfiguration = () => {
    const r = {};
    r.userStore = new user_store_dynamodb_1.UserStoreDynamodb({
        dataMapper: new dynamodb_data_mapper_1.DataMapper({ client: new aws_sdk_1.DynamoDB() }),
    });
    return r;
};
exports.userStoreDynamoConfiguration = userStoreDynamoConfiguration;
//# sourceMappingURL=user-store-dynamo.js.map