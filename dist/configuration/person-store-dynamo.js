"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personStoreDynamoConfiguration = void 0;
const dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
const aws_sdk_1 = require("aws-sdk");
const person_store_dynamodb_1 = require("../stores/person/person-store-dynamodb");
const personStoreDynamoConfiguration = () => {
    const r = {};
    r.personStore = new person_store_dynamodb_1.PersonStoreDynamodb({
        dataMapper: new dynamodb_data_mapper_1.DataMapper({ client: new aws_sdk_1.DynamoDB() }),
    });
    return r;
};
exports.personStoreDynamoConfiguration = personStoreDynamoConfiguration;
//# sourceMappingURL=person-store-dynamo.js.map