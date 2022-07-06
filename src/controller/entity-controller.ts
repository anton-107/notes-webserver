import { Authenticator } from "authentication-module/dist/authenticator";
import { HttpResponse, HttpStatus } from "../http/http";
import { EntityStore } from "../stores/entity-store";

export interface EntityView<T> {
  renderEditingFormOneEntity(entity: T): HttpResponse;
  renderCreationFormOneEntity(): HttpResponse;
}

export interface EntityControllerProperties<T> {
  authenticationToken: string;
  authenticator: Authenticator;
  entityStore: EntityStore<T>;
  entityView: EntityView<T>;
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
  // public async showSingleEntityDetailsPage() {}
  // public async showEntityListPage() {}
  // public async performCreateSingleEntityAction() {}
  // public async performUpdateSingleEntityAction() {}
  // public async performDeleteSingleEntityAction() {}
}
