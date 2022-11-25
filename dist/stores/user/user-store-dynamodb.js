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
exports.UserStoreDynamodb = exports.UserEntity = void 0;
const dynamodb_data_mapper_annotations_1 = require("@aws/dynamodb-data-mapper-annotations");
const USERS_TABLE_NAME = "notes-webserver-users";
let UserEntity = class UserEntity {
};
__decorate([
    (0, dynamodb_data_mapper_annotations_1.hashKey)(),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.rangeKey)(),
    __metadata("design:type", String)
], UserEntity.prototype, "sortKey", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)(),
    __metadata("design:type", String)
], UserEntity.prototype, "passwordHash", void 0);
UserEntity = __decorate([
    (0, dynamodb_data_mapper_annotations_1.table)(USERS_TABLE_NAME)
], UserEntity);
exports.UserEntity = UserEntity;
class UserStoreDynamodb {
    constructor(properties) {
        this.properties = properties;
    }
    async getUserByName(username) {
        try {
            this.properties.logger.info(`[UserStoreDynamodb] fetching up user ${username}`);
            const entity = await this.properties.dataMapper.get(Object.assign(new UserEntity(), { username, sortKey: "USER" }));
            return {
                username: entity.username,
                passwordHash: entity.passwordHash,
            };
        }
        catch (err) {
            this.properties.logger.info("No user found", { username, error: err });
            return null;
        }
    }
    async addUser(user) {
        try {
            const entity = Object.assign(new UserEntity(), user, {
                sortKey: "USER",
            });
            const objectSaved = await this.properties.dataMapper.put(entity);
            this.properties.logger.info("User saved", { data: objectSaved });
        }
        catch (err) {
            this.properties.logger.error("Error adding user: ", { error: err });
            throw err;
        }
    }
}
exports.UserStoreDynamodb = UserStoreDynamodb;
//# sourceMappingURL=user-store-dynamodb.js.map