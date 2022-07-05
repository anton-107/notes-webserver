import { Authenticator } from "authentication-module/dist/authenticator";
import { HttpResponse } from "../http/http";
import { EntityStore } from "../stores/entity-store";
export interface EntityView<T> {
    renderEditingFormOneEntity(entity: T): HttpResponse;
}
export interface EntityControllerProperties<T> {
    authenticationToken: string;
    authenticator: Authenticator;
    entityStore: EntityStore<T>;
    entityView: EntityView<T>;
}
export declare abstract class EntityController<T> {
    private properties;
    constructor(properties: EntityControllerProperties<T>);
    protected abstract getEntityName(): string;
    showEditSingleEntityPage(entityID: string): Promise<HttpResponse>;
}
