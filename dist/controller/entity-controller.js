"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityController = void 0;
const http_1 = require("../http/http");
const response_type_parser_1 = require("../http/response-type-parser");
class EntityController {
    constructor(properties) {
        this.properties = properties;
        this.authorizedUserName = null;
        this.selectedEntity = null;
        this.logger = this.properties.logger;
    }
    async showEditSingleEntityPage(entityID) {
        const user = await this.properties.authenticator.authenticate(this.properties.authenticationToken);
        if (!user.isAuthenticated) {
            this.properties.logger.error("User is not authenticated", {
                username: user.username,
            });
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.FORBIDDEN,
                headers: {},
                body: "Forbidden.",
            };
        }
        const entity = await this.properties.entityStore.getOne(user.username, entityID);
        if (!entity) {
            this.properties.logger.error(`${this.getEntityName()} is not found for user `, { username: user.username, entityID });
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.NOT_FOUND,
                headers: {},
                body: "Not found.",
            };
        }
        this.selectedEntity = entity;
        const editNewEntityResponse = this.properties.entityView.renderEditingFormOneEntity(entity);
        return await this.properties.postProcessorRegistry.processResponse(user.username, editNewEntityResponse);
    }
    async showCreateNewEntityPage() {
        const user = await this.properties.authenticator.authenticate(this.properties.authenticationToken);
        const createNewEntityResponse = this.properties.entityView.renderCreationFormOneEntity({});
        return await this.properties.postProcessorRegistry.processResponse(user.username, createNewEntityResponse);
    }
    async showSingleEntityDetailsPage(entityID) {
        const user = await this.properties.authenticator.authenticate(this.properties.authenticationToken);
        if (!user.isAuthenticated) {
            this.properties.logger.error("User is not authenticated", {
                username: user.username,
            });
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.FORBIDDEN,
                headers: {},
                body: "Forbidden.",
            };
        }
        this.authorizedUserName = user.username;
        const entity = await this.properties.entityStore.getOne(user.username, entityID);
        if (!entity) {
            this.properties.logger.error(`${this.getEntityName()} is not found for user `, { username: user.username, entityID });
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.NOT_FOUND,
                headers: {},
                body: "Not found.",
            };
        }
        return {
            ...this.properties.entityView.renderDetailsPageOneEntity(entity),
        };
    }
    async showListEntitiesPage() {
        const user = await this.properties.authenticator.authenticate(this.properties.authenticationToken);
        if (!user.isAuthenticated) {
            this.properties.logger.error("User is not authenticated", {
                username: user.username,
            });
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.FORBIDDEN,
                headers: {},
                body: "Forbidden.",
            };
        }
        const entities = await this.properties.entityStore.listAll(user.username);
        return {
            ...this.properties.entityView.renderListPageAllEntities(entities),
        };
    }
    async performDeleteSingleEntityAction(entityID) {
        const user = await this.properties.authenticator.authenticate(this.properties.authenticationToken);
        if (!user.isAuthenticated) {
            this.properties.logger.error("User is not authenticated", {
                username: user.username,
            });
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.FORBIDDEN,
                headers: {},
                body: "Forbidden.",
            };
        }
        if (!entityID) {
            this.properties.logger.error(`No ${this.getEntityName()} id found in request`, { entityID });
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.BAD_REQUEST,
                headers: {},
                body: "Bad request.",
            };
        }
        const entity = await this.properties.entityStore.getOne(user.username, entityID);
        if (!entity) {
            this.properties.logger.error(`Entity ${this.getEntityName()} is not found for deletion`, { username: user.username, entityID });
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.FORBIDDEN,
                headers: {},
                body: "Forbidden.",
            };
        }
        try {
            await this.properties.entityStore.deleteOne(user.username, entityID);
        }
        catch (err) {
            this.properties.logger.info(`Could not delete ${this.getEntityName()}`, {
                entityID,
                error: err,
            });
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.INTERNAL_SERVER_ERROR,
                headers: {},
                body: "Internal server error.",
            };
        }
        this.properties.logger.info(`${this.getEntityName()} deleted`, {
            username: user.username,
            entityID,
        });
        if (this.properties.responseType === response_type_parser_1.ResponseType.JSON) {
            return this.properties.entityView.renderDetailsPageOneEntity(entity);
        }
        return this.properties.httpRedirectView.showRedirect(this.getEntityURL(entity));
    }
    async performUpdateSingleEntityAction(form) {
        const user = await this.properties.authenticator.authenticate(this.properties.authenticationToken);
        if (!user.isAuthenticated) {
            this.properties.logger.error("User is not authenticated", {
                username: user.username,
            });
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.FORBIDDEN,
                headers: {},
                body: "Forbidden.",
            };
        }
        const entityID = this.mapRequestToEntityID(form);
        const existingEntity = await this.properties.entityStore.getOne(user.username, entityID);
        if (!existingEntity) {
            this.properties.logger.error(`Entity ${this.getEntityName()} is not found for update`, { username: user.username, entityID });
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.FORBIDDEN,
                headers: {},
                body: "Forbidden.",
            };
        }
        const entity = this.mapRequestToExistingEntity(user.username, existingEntity, form);
        try {
            await this.properties.entityStore.editOne(entity);
        }
        catch (err) {
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.INTERNAL_SERVER_ERROR,
                headers: {},
                body: "Internal server error.",
            };
        }
        if (this.properties.responseType === response_type_parser_1.ResponseType.JSON) {
            return this.properties.entityView.renderDetailsPageOneEntity(entity);
        }
        return this.properties.httpRedirectView.showRedirect(this.getEntityURL(entity));
    }
    async performCreateSingleEntityAction(form) {
        const user = await this.properties.authenticator.authenticate(this.properties.authenticationToken);
        if (!user.isAuthenticated) {
            this.properties.logger.error("User is not authenticated", {
                username: user.username,
            });
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.FORBIDDEN,
                headers: {},
                body: "Forbidden.",
            };
        }
        const entity = this.mapRequestToNewEntity(user.username, form);
        const isAuthorized = await this.isAuthorizedToCreate(user.username, entity);
        if (!isAuthorized) {
            this.properties.logger.error(`User is not authorized to create ${this.getEntityName()}`, { username: user.username, data: entity });
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.FORBIDDEN,
                headers: {},
                body: "Forbidden.",
            };
        }
        await this.properties.entityStore.add(entity);
        if (this.properties.responseType === response_type_parser_1.ResponseType.JSON) {
            return this.properties.entityView.renderDetailsPageOneEntity(entity);
        }
        return this.properties.httpRedirectView.showRedirect(this.getEntityURL(entity));
    }
}
exports.EntityController = EntityController;
//# sourceMappingURL=entity-controller.js.map