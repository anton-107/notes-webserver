import { Authenticator } from "authentication-module/dist/authenticator";
import { FormBody } from "../http/body-parser";
import { HttpResponse, HttpStatus } from "../http/http";
import { ResponseType } from "../http/response-type-parser";
import { EntityStore } from "../stores/entity-store";
import { HttpRedirectView } from "../views/http-redirect-view";
import { PostProcessorRegistry } from "./post-processor";

export interface EntityView<T> {
  renderEditingFormOneEntity(entity: T): HttpResponse;
  renderCreationFormOneEntity(partialEntity: Partial<T>): HttpResponse;
  renderDetailsPageOneEntity(entity: T): HttpResponse;
  renderListPageAllEntities(entities: T[]): HttpResponse;
}

export interface EntityControllerProperties<T> {
  authenticationToken: string;
  authenticator: Authenticator;
  entityStore: EntityStore<T>;
  entityView: EntityView<T>;
  httpRedirectView: HttpRedirectView;
  postProcessorRegistry: PostProcessorRegistry;
  responseType: ResponseType;
}

export abstract class EntityController<T> {
  protected authorizedUserName: string | null = null;
  protected selectedEntity: T | null = null;

  constructor(private properties: EntityControllerProperties<T>) {}
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
      console.error("User is not authenticated", user);
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.FORBIDDEN,
        headers: {},
        body: "Forbidden.",
      };
    }

    const entity = await this.properties.entityStore.getOne(
      user.username,
      entityID
    );
    if (!entity) {
      console.error(
        `${this.getEntityName()} is not found for user `,
        user.username,
        entityID
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
      console.error("User is not authenticated", user);
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.FORBIDDEN,
        headers: {},
        body: "Forbidden.",
      };
    }
    this.authorizedUserName = user.username;

    const entity = await this.properties.entityStore.getOne(
      user.username,
      entityID
    );
    if (!entity) {
      console.error(
        `${this.getEntityName()} is not found for user `,
        user.username,
        entityID
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
      console.error("User is not authenticated", user);
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.FORBIDDEN,
        headers: {},
        body: "Forbidden.",
      };
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
      console.error("User is not authenticated", user);
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.FORBIDDEN,
        headers: {},
        body: "Forbidden.",
      };
    }
    if (!entityID) {
      console.error(`No ${this.getEntityName()} id found in request`, entityID);
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.BAD_REQUEST,
        headers: {},
        body: "Bad request.",
      };
    }

    const entity = await this.properties.entityStore.getOne(
      user.username,
      entityID
    );

    if (!entity) {
      console.error(
        `Entity ${this.getEntityName()} is not found for deletion`,
        user,
        entityID
      );
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.FORBIDDEN,
        headers: {},
        body: "Forbidden.",
      };
    }

    try {
      await this.properties.entityStore.deleteOne(user.username, entityID);
    } catch (err) {
      console.log(`Could not delete ${this.getEntityName()}`, entityID, err);
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        headers: {},
        body: "Internal server error.",
      };
    }

    console.log(`${this.getEntityName()} deleted`, user.username, entityID);
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
      console.error("User is not authenticated", user);
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.FORBIDDEN,
        headers: {},
        body: "Forbidden.",
      };
    }

    const entityID = this.mapRequestToEntityID(form);
    const existingEntity = await this.properties.entityStore.getOne(
      user.username,
      entityID
    );
    if (!existingEntity) {
      console.error(
        `Entity ${this.getEntityName()} is not found for update`,
        user,
        entityID
      );
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.FORBIDDEN,
        headers: {},
        body: "Forbidden.",
      };
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
      console.error("User is not authenticated", user);
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.FORBIDDEN,
        headers: {},
        body: "Forbidden.",
      };
    }

    const entity = this.mapRequestToNewEntity(user.username, form);
    const isAuthorized = await this.isAuthorizedToCreate(user.username, entity);

    if (!isAuthorized) {
      console.error(
        `User is not authorized to create ${this.getEntityName()}`,
        user,
        entity
      );
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.FORBIDDEN,
        headers: {},
        body: "Forbidden.",
      };
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
