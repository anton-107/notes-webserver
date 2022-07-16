import { Authenticator } from "authentication-module/dist/authenticator";
import { FormBody } from "../http/body-parser";
import { HttpResponse, HttpStatus } from "../http/http";
import { EntityStore } from "../stores/entity-store";
import { HttpRedirectView } from "../views/http-redirect-view";

export interface EntityView<T> {
  renderEditingFormOneEntity(entity: T): HttpResponse;
  renderCreationFormOneEntity(): HttpResponse;
  renderDetailsPageOneEntity(entity: T): HttpResponse;
}

export interface EntityControllerProperties<T> {
  authenticationToken: string;
  authenticator: Authenticator;
  entityStore: EntityStore<T>;
  entityView: EntityView<T>;
  httpRedirectView: HttpRedirectView;
}

export interface EntityControllerHttpResponse extends HttpResponse {
  authorizedUser: string | null;
}

export abstract class EntityController<T> {
  constructor(private properties: EntityControllerProperties<T>) {}
  protected abstract getEntityName(): string;
  protected abstract mapRequestToExistingEntity(
    username: string,
    requestForm: FormBody
  ): T;
  protected abstract mapRequestToNewEntity(
    username: string,
    requestForm: FormBody
  ): T;
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

    return this.properties.entityView.renderEditingFormOneEntity(entity);
  }
  public async showCreateNewEntityPage(): Promise<HttpResponse> {
    return this.properties.entityView.renderCreationFormOneEntity();
  }
  public async showSingleEntityDetailsPage(
    entityID: string
  ): Promise<EntityControllerHttpResponse> {
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
        authorizedUser: null,
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
        authorizedUser: user.username,
        isBase64Encoded: false,
        statusCode: HttpStatus.NOT_FOUND,
        headers: {},
        body: "Not found.",
      };
    }
    return {
      ...this.properties.entityView.renderDetailsPageOneEntity(entity),
      authorizedUser: user.username,
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
    const entity = this.mapRequestToExistingEntity(user.username, form);
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
    return this.properties.httpRedirectView.showRedirect(
      this.getEntityURL(entity)
    );
  }
  // public async showEntityListPage() {}
}
