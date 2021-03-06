import { Authenticator } from "authentication-module/dist/authenticator";
import { FormBody } from "../http/body-parser";
import { HttpResponse } from "../http/http";
import { EntityStore } from "../stores/entity-store";
import { HttpRedirectView } from "../views/http-redirect-view";
import { PostProcessorRegistry } from "./post-processor";
export interface EntityView<T> {
    renderEditingFormOneEntity(entity: T): HttpResponse;
    renderCreationFormOneEntity(partialEntity: Partial<T>): HttpResponse;
    renderDetailsPageOneEntity(entity: T): HttpResponse;
}
export interface EntityControllerProperties<T> {
    authenticationToken: string;
    authenticator: Authenticator;
    entityStore: EntityStore<T>;
    entityView: EntityView<T>;
    httpRedirectView: HttpRedirectView;
    postProcessorRegistry: PostProcessorRegistry;
}
export declare abstract class EntityController<T> {
    private properties;
    protected authorizedUserName: string | null;
    protected selectedEntity: T | null;
    constructor(properties: EntityControllerProperties<T>);
    protected abstract getEntityName(): string;
    protected abstract mapRequestToExistingEntity(username: string, existingEntity: T, requestForm: FormBody): T;
    protected abstract mapRequestToNewEntity(username: string, requestForm: FormBody): T;
    protected abstract mapRequestToEntityID(requestForm: FormBody): string;
    protected abstract isAuthorizedToCreate(user: string, entity: T): Promise<boolean>;
    protected abstract getEntityURL(entity: T): string;
    showEditSingleEntityPage(entityID: string): Promise<HttpResponse>;
    showCreateNewEntityPage(): Promise<HttpResponse>;
    showSingleEntityDetailsPage(entityID: string): Promise<HttpResponse>;
    performDeleteSingleEntityAction(entityID: string): Promise<HttpResponse>;
    performUpdateSingleEntityAction(form: FormBody): Promise<HttpResponse>;
    performCreateSingleEntityAction(form: FormBody): Promise<HttpResponse>;
}
