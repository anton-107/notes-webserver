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
exports.NoteStoreDynamodb = exports.NoteEntity = void 0;
const dynamodb_data_mapper_annotations_1 = require("@aws/dynamodb-data-mapper-annotations");
const dynamodb_expressions_1 = require("@aws/dynamodb-expressions");
const NOTES_TABLE_NAME = "notes-webserver-notebook";
let NoteEntity = class NoteEntity {
};
__decorate([
    (0, dynamodb_data_mapper_annotations_1.hashKey)(),
    __metadata("design:type", String)
], NoteEntity.prototype, "owner", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.rangeKey)(),
    __metadata("design:type", String)
], NoteEntity.prototype, "sortKey", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], NoteEntity.prototype, "id", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", Object)
], NoteEntity.prototype, "notebook", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", Object)
], NoteEntity.prototype, "type", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], NoteEntity.prototype, "content", void 0);
NoteEntity = __decorate([
    (0, dynamodb_data_mapper_annotations_1.table)(NOTES_TABLE_NAME)
], NoteEntity);
exports.NoteEntity = NoteEntity;
class NoteStoreDynamodb {
    constructor(properties) {
        this.properties = properties;
    }
    async add(note) {
        try {
            // prepend notebook id to note id:
            note.id = `${note.notebook.id}-${note.id}`;
            const entity = Object.assign(new NoteEntity(), note, {
                sortKey: `NOTE_${note.id}`,
            });
            const objectSaved = await this.properties.dataMapper.put(entity);
            console.info("Note saved", objectSaved);
        }
        catch (err) {
            console.error("Error adding note: ", err);
            throw err;
        }
    }
    async listAll(owner) {
        try {
            console.log(`[NoteStoreDynamodb] fetching up notes for owner ${owner}`);
            const r = [];
            for await (const entity of this.properties.dataMapper.query(NoteEntity, {
                type: "And",
                conditions: [
                    { type: "Equals", subject: "owner", object: owner },
                    new dynamodb_expressions_1.FunctionExpression("begins_with", new dynamodb_expressions_1.AttributePath("sortKey"), "NOTE_"),
                ],
            })) {
                r.push({
                    ...entity,
                });
            }
            return r;
        }
        catch (err) {
            console.log("No notes found for user", owner, err);
            return [];
        }
    }
    async getOne(owner, id) {
        try {
            const entity = await this.properties.dataMapper.get(Object.assign(new NoteEntity(), {
                owner,
                sortKey: `NOTE_${id}`,
            }));
            return {
                ...entity,
            };
        }
        catch (err) {
            console.error(`Could not find note for ${owner}/${id}`, err);
            return null;
        }
    }
    async deleteOne(owner, id) {
        try {
            await this.properties.dataMapper.delete(Object.assign(new NoteEntity(), {
                owner,
                sortKey: `NOTE_${id}`,
            }));
        }
        catch (err) {
            console.error(`Could not delete note for ${owner}/${id}`, err);
            throw err;
        }
    }
    async editOne(note) {
        try {
            await this.properties.dataMapper.update(Object.assign(new NoteEntity(), { sortKey: `NOTE_${note.id}` }, note));
        }
        catch (err) {
            console.error("Could not edit note", note, err);
            throw err;
        }
    }
    async listAllInNotebook(owner, notebookID) {
        try {
            console.log(`[NoteStoreDynamodb] listing all notes for owner ${owner} in ${notebookID}`);
            const r = [];
            for await (const entity of this.properties.dataMapper.query(NoteEntity, {
                type: "And",
                conditions: [
                    { type: "Equals", subject: "owner", object: owner },
                    new dynamodb_expressions_1.FunctionExpression("begins_with", new dynamodb_expressions_1.AttributePath("sortKey"), `NOTE_${notebookID}`),
                ],
            })) {
                r.push({
                    ...entity,
                });
            }
            return r;
        }
        catch (err) {
            console.log("No notes found for user", owner, err);
            return [];
        }
    }
}
exports.NoteStoreDynamodb = NoteStoreDynamodb;
//# sourceMappingURL=note-store-dynamodb.js.map