import { Authenticator } from "authentication-module/dist/authenticator";

import { FormBody } from "../http/body-parser";
import { HttpResponse, HttpStatus } from "../http/http";
import { ResponseType } from "../http/response-type-parser";
import { Logger } from "../logger/logger";
import { EntityStore } from "../stores/entity-store";
import { EntityView } from "../views/entity-view";
import { HttpBadRequestView } from "../views/http-bad-request-view";
import { HttpForbiddenView } from "../views/http-forbidden-view";
import { HttpRedirectView } from "../views/http-redirect-view";
import { PostProcessorRegistry } from "./post-processor";

export interface EntityControllerProperties<T> {
  logger: Logger;
  authenticationToken: string;
  authenticator: Authenticator;
  entityStore: EntityStore<T>;
  entityView: EntityView<T>;
  httpRedirectView: HttpRedirectView;
  httpForbiddenView: HttpForbiddenView;
  httpBadRequestView: HttpBadRequestView;
  postProcessorRegistry: PostProcessorRegistry;
  responseType: ResponseType;
}

export abstract class EntityController<T> {
  protected authorizedUserName: string | null = null;
  protected selectedEntity: T | null = null;
  protected logger: Logger;

  constructor(private properties: EntityControllerProperties<T>) {
    this.logger = this.properties.logger;
  }
  protected abstract getEntityName(): string;
  protected abstract mapRequestToExistingEntity(
    username: string,
    existingEntity: T,
    requestForm: FormBody
  ): T;
  protected abstract mapRequestToNewEntity(
    username: string,
    requestForm: FormBody
  ): T;
  protected abstract mapRequestToEntityID(requestForm: FormBody): string;
  protected abstract isAuthorizedToCreate(
    user: string,
    entity: T
  ): Promise<boolean>;
  protected abstract getEntityURL(entity: T): string;
  public async showEditSingleEntityPage(
    entityID: string
  ): Promise<HttpResponse> {
    const user = await this.properties.authenticator.authenticate(
      this.properties.authenticationToken
    );

    if (!user.isAuthenticated) {
      this.properties.logger.error("User is not authenticated", {
        username: user.username,
      });
      return this.properties.httpForbiddenView.showForbidden();
    }

    const entity = await this.properties.entityStore.getOne(
      user.username,
      entityID
    );
    if (!entity) {
      this.properties.logger.error(
        `${this.getEntityName()} is not found for user `,
        { username: user.username, entityID }
      );
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.NOT_FOUND,
        headers: {},
        body: "Not found.",
      };
    }

    this.selectedEntity = entity;
    const editNewEntityResponse =
      this.properties.entityView.renderEditingFormOneEntity(entity);
    return await this.properties.postProcessorRegistry.processResponse(
      user.username,
      editNewEntityResponse
    );
  }
  public async showCreateNewEntityPage(): Promise<HttpResponse> {
    const user = await this.properties.authenticator.authenticate(
      this.properties.authenticationToken
    );
    const createNewEntityResponse =
      this.properties.entityView.renderCreationFormOneEntity({});
    return await this.properties.postProcessorRegistry.processResponse(
      user.username,
      createNewEntityResponse
    );
  }
  public async showSingleEntityDetailsPage(
    entityID: string
  ): Promise<HttpResponse> {
    const user = await this.properties.authenticator.authenticate(
      this.properties.authenticationToken
    );

    if (!user.isAuthenticated) {
      this.properties.logger.error("User is not authenticated", {
        username: user.username,
      });
      return this.properties.httpForbiddenView.showForbidden();
    }
    this.authorizedUserName = user.username;

    const entity = await this.properties.entityStore.getOne(
      user.username,
      entityID
    );
    if (!entity) {
      this.properties.logger.error(
        `${this.getEntityName()} is not found for user `,
        { username: user.username, entityID }
      );
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.NOT_FOUND,
        headers: {},
        body: "Not found.",
      };
    }
    return {
      ...this.properties.entityView.renderDetailsPageOneEntity(entity),
    };
  }
  public async showListEntitiesPage(): Promise<HttpResponse> {
    const user = await this.properties.authenticator.authenticate(
      this.properties.authenticationToken
    );

    if (!user.isAuthenticated) {
      this.properties.logger.error("User is not authenticated", {
        username: user.username,
      });
      return this.properties.httpForbiddenView.showForbidden();
    }

    const entities = await this.properties.entityStore.listAll(user.username);
    return {
      ...this.properties.entityView.renderListPageAllEntities(entities),
    };
  }
  public async performDeleteSingleEntityAction(
    entityID: string
  ): Promise<HttpResponse> {
    const user = await this.properties.authenticator.authenticate(
      this.properties.authenticationToken
    );

    if (!user.isAuthenticated) {
      this.properties.logger.error("User is not authenticated", {
        username: user.username,
      });
      return this.properties.httpForbiddenView.showForbidden();
    }
    if (!entityID) {
      this.properties.logger.error(
        `No ${this.getEntityName()} id found in request`,
        { entityID }
      );
      return this.properties.httpBadRequestView.showBadRequest();
    }

    const entity = await this.properties.entityStore.getOne(
      user.username,
      entityID
    );

    if (!entity) {
      this.properties.logger.error(
        `Entity ${this.getEntityName()} is not found for deletion`,
        { username: user.username, entityID }
      );
      return this.properties.httpForbiddenView.showForbidden();
    }

    try {
      await this.properties.entityStore.deleteOne(user.username, entityID);
    } catch (err) {
      this.properties.logger.info(`Could not delete ${this.getEntityName()}`, {
        entityID,
        error: err,
      });
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        headers: {},
        body: "Internal server error.",
      };
    }

    this.properties.logger.info(`${this.getEntityName()} deleted`, {
      username: user.username,
      entityID,
    });

    if (this.properties.responseType === ResponseType.JSON) {
      return this.properties.entityView.renderDetailsPageOneEntity(entity);
    }
    return this.properties.httpRedirectView.showRedirect(
      this.getEntityURL(entity)
    );
  }
  public async performUpdateSingleEntityAction(
    form: FormBody
  ): Promise<HttpResponse> {
    const user = await this.properties.authenticator.authenticate(
      this.properties.authenticationToken
    );
    if (!user.isAuthenticated) {
      this.properties.logger.error("User is not authenticated", {
        username: user.username,
      });
      return this.properties.httpForbiddenView.showForbidden();
    }

    const entityID = this.mapRequestToEntityID(form);
    const existingEntity = await this.properties.entityStore.getOne(
      user.username,
      entityID
    );
    if (!existingEntity) {
      this.properties.logger.error(
        `Entity ${this.getEntityName()} is not found for update`,
        { username: user.username, entityID }
      );
      return this.properties.httpForbiddenView.showForbidden();
    }

    const entity = this.mapRequestToExistingEntity(
      user.username,
      existingEntity,
      form
    );
    try {
      await this.properties.entityStore.editOne(entity);
    } catch (err) {
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        headers: {},
        body: "Internal server error.",
      };
    }

    if (this.properties.responseType === ResponseType.JSON) {
      return this.properties.entityView.renderDetailsPageOneEntity(entity);
    }

    return this.properties.httpRedirectView.showRedirect(
      this.getEntityURL(entity)
    );
  }
  public async performCreateSingleEntityAction(
    form: FormBody
  ): Promise<HttpResponse> {
    const user = await this.properties.authenticator.authenticate(
      this.properties.authenticationToken
    );
    if (!user.isAuthenticated) {
      this.properties.logger.error("User is not authenticated", {
        username: user.username,
      });
      return this.properties.httpForbiddenView.showForbidden();
    }

    const entity = this.mapRequestToNewEntity(user.username, form);
    const isAuthorized = await this.isAuthorizedToCreate(user.username, entity);

    if (!isAuthorized) {
      this.properties.logger.error(
        `User is not authorized to create ${this.getEntityName()}`,
        { username: user.username, data: entity }
      );
      return this.properties.httpForbiddenView.showForbidden();
    }

    await this.properties.entityStore.add(entity);
    if (this.properties.responseType === ResponseType.JSON) {
      return this.properties.entityView.renderDetailsPageOneEntity(entity);
    }
    return this.properties.httpRedirectView.showRedirect(
      this.getEntityURL(entity)
    );
  }
  // public async showEntityListPage() {}
}
