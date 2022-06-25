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
exports.NotebookStoreDynamodb = exports.NotebookEntity = void 0;
const dynamodb_data_mapper_annotations_1 = require("@aws/dynamodb-data-mapper-annotations");
const uuid_1 = require("uuid");
const NOTEBOOK_TABLE_NAME = "notes-webserver-notebook";
let NotebookEntity = class NotebookEntity {
};
__decorate([
    (0, dynamodb_data_mapper_annotations_1.hashKey)(),
    __metadata("design:type", String)
], NotebookEntity.prototype, "owner", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.rangeKey)(),
    __metadata("design:type", String)
], NotebookEntity.prototype, "sortKey", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], NotebookEntity.prototype, "name", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], NotebookEntity.prototype, "id", void 0);
NotebookEntity = __decorate([
    (0, dynamodb_data_mapper_annotations_1.table)(NOTEBOOK_TABLE_NAME)
], NotebookEntity);
exports.NotebookEntity = NotebookEntity;
class NotebookStoreDynamodb {
    constructor(properties) {
        this.properties = properties;
    }
    async add(notebook) {
        try {
            const entity = Object.assign(new NotebookEntity(), notebook, {
                sortKey: `NOTEBOOK_${Date.now()}_${(0, uuid_1.v4)()}`,
            });
            const objectSaved = await this.properties.dataMapper.put(entity);
            console.info("Notebook saved", objectSaved);
        }
        catch (err) {
            console.error("Error adding notebook: ", err);
            throw err;
        }
    }
    async listAll(owner) {
        try {
            console.log(`[NotebookStoreDynamodb] fetching up notebooks for owner ${owner}`);
            const r = [];
            for await (const entity of this.properties.dataMapper.query(NotebookEntity, { owner })) {
                r.push({
                    name: entity.name,
                    owner: entity.owner,
                    id: entity.id,
                });
            }
            return r;
        }
        catch (err) {
            console.log("No notebooks found for user", owner, err);
            return [];
        }
    }
}
exports.NotebookStoreDynamodb = NotebookStoreDynamodb;
//# sourceMappingURL=notebook-store-dynamodb.js.map