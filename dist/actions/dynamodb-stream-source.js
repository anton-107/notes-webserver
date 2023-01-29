"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmarshallRecordToNotebook = exports.unmarshallRecordToNote = void 0;
const dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
const dynamodb_data_marshaller_1 = require("@aws/dynamodb-data-marshaller");
const note_store_dynamodb_1 = require("../stores/note/note-store-dynamodb");
const notebook_store_dynamodb_1 = require("../stores/notebook/notebook-store-dynamodb");
function unmarshallRecordToNote(image) {
    return (0, dynamodb_data_marshaller_1.unmarshallItem)((0, dynamodb_data_mapper_1.getSchema)(note_store_dynamodb_1.NoteEntity.prototype), image, note_store_dynamodb_1.NoteEntity);
}
exports.unmarshallRecordToNote = unmarshallRecordToNote;
function unmarshallRecordToNotebook(image) {
    return (0, dynamodb_data_marshaller_1.unmarshallItem)((0, dynamodb_data_mapper_1.getSchema)(notebook_store_dynamodb_1.NotebookEntity.prototype), image, notebook_store_dynamodb_1.NotebookEntity);
}
exports.unmarshallRecordToNotebook = unmarshallRecordToNotebook;
//# sourceMappingURL=dynamodb-stream-source.js.map