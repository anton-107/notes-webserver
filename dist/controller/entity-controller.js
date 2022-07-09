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
    async showSingleEntityDetailsPage(entityID) {
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
        return this.properties.entityView.renderDetailsPageOneEntity(entity);
    }
    async performDeleteSingleEntityAction(entityID) {
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
        if (!entityID) {
            console.error(`No ${this.getEntityName()} id found in request`, entityID);
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.BAD_REQUEST,
                headers: {},
                body: "Bad request.",
            };
        }
        try {
            await this.properties.entityStore.deleteOne(user.username, entityID);
        }
        catch (err) {
            console.log(`Could not delete ${this.getEntityName()}`, entityID, err);
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.INTERNAL_SERVER_ERROR,
                headers: {},
                body: "Internal server error.",
            };
        }
        console.log(`${this.getEntityName()} deleted`, user.username, entityID);
        return this.properties.httpRedirectView.showRedirect("/home");
    }
    async performUpdateSingleEntityAction(form) {
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
        try {
            await this.properties.entityStore.editOne(this.mapRequestToEntity(user.username, form));
        }
        catch (err) {
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.INTERNAL_SERVER_ERROR,
                headers: {},
                body: "Internal server error.",
            };
        }
        return this.properties.httpRedirectView.showRedirect("/home");
    }
}
exports.EntityController = EntityController;
//# sourceMappingURL=entity-controller.js.map