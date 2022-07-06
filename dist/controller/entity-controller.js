"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityController = void 0;
const http_1 = require("../http/http");
class EntityController {
    constructor(properties) {
        this.properties = properties;
    }
    async showEditSingleEntityPage(entityID) {
        const user = await this.properties.authenticator.authenticate(this.properties.authenticationToken);
        if (!user.isAuthenticated) {
            console.error("User is not authenticated", user);
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.FORBIDDEN,
                headers: {},
                body: "Forbidden.",
            };
        }
        const entity = await this.properties.entityStore.getOne(user.username, entityID);
        if (!entity) {
            console.error(`${this.getEntityName()} is not found for user `, user.username, entityID);
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.NOT_FOUND,
                headers: {},
                body: "Not found.",
            };
        }
        return this.properties.entityView.renderEditingFormOneEntity(entity);
    }
    async showCreateNewEntityPage() {
        return this.properties.entityView.renderCreationFormOneEntity();
    }
}
exports.EntityController = EntityController;
//# sourceMappingURL=entity-controller.js.map