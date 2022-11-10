"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmarshallRecordToNote = void 0;
const dynamodb_data_marshaller_1 = require("@aws/dynamodb-data-marshaller");
const dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
const note_store_dynamodb_1 = require("../stores/note/note-store-dynamodb");
function unmarshallRecordToNote(image) {
    return (0, dynamodb_data_marshaller_1.unmarshallItem)((0, dynamodb_data_mapper_1.getSchema)(note_store_dynamodb_1.NoteEntity.prototype), image, note_store_dynamodb_1.NoteEntity);
}
exports.unmarshallRecordToNote = unmarshallRecordToNote;
//# sourceMappingURL=dynamodb-stream-source.js.map