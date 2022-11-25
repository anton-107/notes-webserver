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
exports.PersonStoreDynamodb = exports.PersonEntity = void 0;
const dynamodb_data_mapper_annotations_1 = require("@aws/dynamodb-data-mapper-annotations");
const PERSON_TABLE_NAME = "notes-webserver-people";
let PersonEntity = class PersonEntity {
};
__decorate([
    (0, dynamodb_data_mapper_annotations_1.hashKey)(),
    __metadata("design:type", String)
], PersonEntity.prototype, "manager", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.rangeKey)(),
    __metadata("design:type", String)
], PersonEntity.prototype, "sortKey", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], PersonEntity.prototype, "name", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], PersonEntity.prototype, "email", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], PersonEntity.prototype, "id", void 0);
PersonEntity = __decorate([
    (0, dynamodb_data_mapper_annotations_1.table)(PERSON_TABLE_NAME)
], PersonEntity);
exports.PersonEntity = PersonEntity;
class PersonStoreDynamodb {
    constructor(properties) {
        this.properties = properties;
    }
    async add(person) {
        try {
            const entity = Object.assign(new PersonEntity(), person, {
                sortKey: `PERSON_${person.id}`,
            });
            const objectSaved = await this.properties.dataMapper.put(entity);
            this.properties.logger.info("Person saved", { data: objectSaved });
        }
        catch (err) {
            this.properties.logger.error("Error adding person: ", { error: err });
            throw err;
        }
    }
    async listAll(manager) {
        try {
            this.properties.logger.info(`[PersonStoreDynamodb] fetching up people for manager ${manager}`);
            const r = [];
            for await (const entity of this.properties.dataMapper.query(PersonEntity, { manager })) {
                r.push({
                    name: entity.name,
                    email: entity.email,
                    manager: entity.manager,
                    id: entity.id,
                });
            }
            return r;
        }
        catch (err) {
            this.properties.logger.info("No people found for manager", {
                owner: manager,
                error: err,
            });
            return [];
        }
    }
    async getOne(manager, id) {
        try {
            const entity = await this.properties.dataMapper.get(Object.assign(new PersonEntity(), {
                manager,
                sortKey: `PERSON_${id}`,
            }));
            return {
                manager: entity.manager,
                id: entity.id,
                name: entity.name,
                email: entity.email,
            };
        }
        catch (err) {
            this.properties.logger.error(`Could not find peson for ${manager}/${id}`, { error: err });
            return null;
        }
    }
    async deleteOne(manager, id) {
        try {
            await this.properties.dataMapper.delete(Object.assign(new PersonEntity(), {
                manager,
                sortKey: `PERSON_${id}`,
            }));
        }
        catch (err) {
            this.properties.logger.error(`Could not delete person for ${manager}/${id}`, { error: err });
            throw err;
        }
    }
    async editOne(person) {
        try {
            await this.properties.dataMapper.update(Object.assign(new PersonEntity(), { sortKey: `PERSON_${person.id}` }, person));
        }
        catch (err) {
            this.properties.logger.error("Could not edit person", {
                data: person,
                error: err,
            });
            throw err;
        }
    }
}
exports.PersonStoreDynamodb = PersonStoreDynamodb;
//# sourceMappingURL=person-store-dynamodb.js.map