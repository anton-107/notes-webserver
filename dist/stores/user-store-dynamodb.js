"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStoreDynamodb = void 0;
const dynamodb_data_mapper_annotations_1 = require("@aws/dynamodb-data-mapper-annotations");
const dynamodb_data_mapper_1 = require("@aws/dynamodb-data-mapper");
let UserEntity = class UserEntity {
};
__decorate([
    (0, dynamodb_data_mapper_annotations_1.hashKey)()
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.rangeKey)()
], UserEntity.prototype, "sortKey", void 0);
__decorate([
    (0, dynamodb_data_mapper_annotations_1.attribute)()
], UserEntity.prototype, "passwordHash", void 0);
UserEntity = __decorate([
    (0, dynamodb_data_mapper_annotations_1.table)("notes-webserver-users")
], UserEntity);
class UserStoreDynamodb {
    constructor(dynamoDB) {
        this.dataMapper = new dynamodb_data_mapper_1.DataMapper({
            client: dynamoDB,
        });
    }
    async getUserByName(username) {
        try {
            const entity = await this.dataMapper.get(Object.assign(new UserEntity(), { name: username }));
            return {
                username: entity.name,
                passwordHash: entity.passwordHash,
            };
        }
        catch (err) {
            console.log("No user found", username);
            return null;
        }
    }
    async addUser(user) {
        const entity = Object.assign(new UserEntity(), user);
        const objectSaved = await this.dataMapper.put(entity);
        console.info("User saved", objectSaved);
    }
}
exports.UserStoreDynamodb = UserStoreDynamodb;
//# sourceMappingURL=user-store-dynamodb.js.map