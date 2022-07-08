import { Authenticator } from "authentication-module/dist/authenticator";
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

export abstract class EntityController<T> {
  constructor(private properties: EntityControllerProperties<T>) {}
  protected abstract getEntityName(): string;
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
    return this.properties.entityView.renderDetailsPageOneEntity(entity);
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
    return this.properties.httpRedirectView.showRedirect("/home");
  }
  // public async showEntityListPage() {}
  // public async performCreateSingleEntityAction() {}
  // public async performUpdateSingleEntityAction() {}
}
