"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteAttachmentsStoreDynamodb = exports.NoteAttachmentEntity = void 0;
const dynamodb_data_mapper_annotations_1 = require("@aws/dynamodb-data-mapper-annotations");
const dynamodb_expressions_1 = require("@aws/dynamodb-expressions");
const NOTE_ATTACHMENTS__TABLE_NAME = "notes-webserver-notebook";
let NoteAttachmentEntity = class NoteAttachmentEntity {
};
__decorate([
    (0, dynamodb_data_mapper_annotations_1.hashKey)(),
    __metadata("design:type", String)
], NoteAttachmentEntity.prototype, "owner", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.rangeKey)(),
    __metadata("design:type", String)
], NoteAttachmentEntity.prototype, "sortKey", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], NoteAttachmentEntity.prototype, "id", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], NoteAttachmentEntity.prototype, "noteID", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], NoteAttachmentEntity.prototype, "name", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], NoteAttachmentEntity.prototype, "objectKey", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], NoteAttachmentEntity.prototype, "createdAt", void 0);
NoteAttachmentEntity = __decorate([
    (0, dynamodb_data_mapper_annotations_1.table)(NOTE_ATTACHMENTS__TABLE_NAME)
], NoteAttachmentEntity);
exports.NoteAttachmentEntity = NoteAttachmentEntity;
class NoteAttachmentsStoreDynamodb {
    constructor(properties) {
        this.properties = properties;
    }
    async add(attachment) {
        try {
            // prepend notebook id to note id:
            attachment.id = `${attachment.noteID}-${attachment.id}`;
            const entity = Object.assign(new NoteAttachmentEntity(), attachment, {
                sortKey: `ATTACHMENT_${attachment.id}`,
            });
            const objectSaved = await this.properties.dataMapper.put(entity);
            console.info("Attachment saved", objectSaved);
        }
        catch (err) {
            console.error("Error adding attachment: ", err);
            throw err;
        }
    }
    async listAllForNote(owner, noteID) {
        try {
            console.log(`[NoteAttachmentsStoreDynamodb] listing all attachments for owner ${owner} for note ${noteID}`);
            const r = [];
            for await (const entity of this.properties.dataMapper.query(NoteAttachmentEntity, {
                type: "And",
                conditions: [
                    { type: "Equals", subject: "owner", object: owner },
                    new dynamodb_expressions_1.FunctionExpression("begins_with", new dynamodb_expressions_1.AttributePath("sortKey"), `ATTACHMENT_${noteID}`),
                ],
            })) {
                r.push({
                    ...entity,
                });
            }
            return r;
        }
        catch (err) {
            console.log("No attachments found for note", owner, err);
            return [];
        }
    }
}
exports.NoteAttachmentsStoreDynamodb = NoteAttachmentsStoreDynamodb;
//# sourceMappingURL=note-attachments-store-dynamodb.js.map