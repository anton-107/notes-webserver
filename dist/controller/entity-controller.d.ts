import { Authenticator } from "authentication-module/dist/authenticator";
import { FormBody } from "../http/body-parser";
import { HttpResponse } from "../http/http";
import { ResponseType } from "../http/response-type-parser";
import { Logger } from "../logger/logger";
import { EntityStore } from "../stores/entity-store";
import { EntityView } from "../views/entity-view";
import { HttpRedirectView } from "../views/http-redirect-view";
import { PostProcessorRegistry } from "./post-processor";
export interface EntityControllerProperties<T> {
    logger: Logger;
    authenticationToken: string;
    authenticator: Authenticator;
    entityStore: EntityStore<T>;
    entityView: EntityView<T>;
    httpRedirectView: HttpRedirectView;
    postProcessorRegistry: PostProcessorRegistry;
    responseType: ResponseType;
}
export declare abstract class EntityController<T> {
    private properties;
    protected authorizedUserName: string | null;
    protected selectedEntity: T | null;
    protected logger: Logger;
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
    showListEntitiesPage(): Promise<HttpResponse>;
    performDeleteSingleEntityAction(entityID: string): Promise<HttpResponse>;
    performUpdateSingleEntityAction(form: FormBody): Promise<HttpResponse>;
    performCreateSingleEntityAction(form: FormBody): Promise<HttpResponse>;
}
