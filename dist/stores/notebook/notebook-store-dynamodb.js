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
const dynamodb_expressions_1 = require("@aws/dynamodb-expressions");
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
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", Array)
], NotebookEntity.prototype, "sections", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", Array)
], NotebookEntity.prototype, "tableColumns", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], NotebookEntity.prototype, "createdAt", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], NotebookEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], NotebookEntity.prototype, "status", void 0);
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
                sortKey: `NOTEBOOK_${notebook.id}`,
            });
            const objectSaved = await this.properties.dataMapper.put(entity);
            this.properties.logger.info("Note saved", { data: objectSaved });
        }
        catch (err) {
            this.properties.logger.error("Error adding notebook: ", { error: err });
            throw err;
        }
    }
    async listAll(owner) {
        try {
            this.properties.logger.info(`[NotebookStoreDynamodb] fetching up notebooks for owner ${owner}`);
            const r = [];
            for await (const entity of this.properties.dataMapper.query(NotebookEntity, {
                type: "And",
                conditions: [
                    { type: "Equals", subject: "owner", object: owner },
                    new dynamodb_expressions_1.FunctionExpression("begins_with", new dynamodb_expressions_1.AttributePath("sortKey"), "NOTEBOOK_"),
                ],
            })) {
                r.push({
                    name: entity.name,
                    owner: entity.owner,
                    id: entity.id,
                    sections: entity.sections,
                    tableColumns: entity.tableColumns,
                    createdAt: entity.createdAt,
                    updatedAt: entity.updatedAt,
                    status: entity.status,
                });
            }
            return r;
        }
        catch (err) {
            this.properties.logger.info("No notebooks found for user", {
                owner,
                error: err,
            });
            return [];
        }
    }
    async getOne(owner, id) {
        try {
            const entity = await this.properties.dataMapper.get(Object.assign(new NotebookEntity(), {
                owner,
                sortKey: `NOTEBOOK_${id}`,
            }));
            return {
                owner: entity.owner,
                id: entity.id,
                name: entity.name,
                sections: entity.sections,
                tableColumns: entity.tableColumns,
                createdAt: entity.createdAt,
                updatedAt: entity.updatedAt,
                status: entity.status,
            };
        }
        catch (err) {
            this.properties.logger.error(`Could not find notebook for ${owner}/${id}`, { error: err });
            return null;
        }
    }
    async deleteOne(owner, id) {
        try {
            await this.properties.dataMapper.delete(Object.assign(new NotebookEntity(), {
                owner,
                sortKey: `NOTEBOOK_${id}`,
            }));
        }
        catch (err) {
            this.properties.logger.error(`Could not delete notebook for ${owner}/${id}`, { error: err });
            throw err;
        }
    }
    async editOne(notebook) {
        try {
            await this.properties.dataMapper.update(Object.assign(new NotebookEntity(), { sortKey: `NOTEBOOK_${notebook.id}` }, notebook));
        }
        catch (err) {
            this.properties.logger.error("Could not edit notebook", {
                data: notebook,
                error: err,
            });
            throw err;
        }
    }
}
exports.NotebookStoreDynamodb = NotebookStoreDynamodb;
//# sourceMappingURL=notebook-store-dynamodb.js.map