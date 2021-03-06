"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteStoreDynamoConfiguration = void 0;
const dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
const aws_sdk_1 = require("aws-sdk");
const note_store_dynamodb_1 = require("../stores/note/note-store-dynamodb");
const noteStoreDynamoConfiguration = () => {
    const r = {};
    r.noteStore = new note_store_dynamodb_1.NoteStoreDynamodb({
        dataMapper: new dynamodb_data_mapper_1.DataMapper({ client: new aws_sdk_1.DynamoDB() }),
    });
    return r;
};
exports.noteStoreDynamoConfiguration = noteStoreDynamoConfiguration;
//# sourceMappingURL=note-store-dynamo.js.map