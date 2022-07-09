"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notebookStoreDynamoConfiguration = void 0;
const dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
const aws_sdk_1 = require("aws-sdk");
const notebook_store_dynamodb_1 = require("../stores/notebook/notebook-store-dynamodb");
const notebookStoreDynamoConfiguration = () => {
    const r = {};
    r.notebookStore = new notebook_store_dynamodb_1.NotebookStoreDynamodb({
        dataMapper: new dynamodb_data_mapper_1.DataMapper({ client: new aws_sdk_1.DynamoDB() }),
    });
    return r;
};
exports.notebookStoreDynamoConfiguration = notebookStoreDynamoConfiguration;
//# sourceMappingURL=notebook-store-dynamo.js.map