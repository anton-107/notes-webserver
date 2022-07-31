import { Authenticator, PasswordHashingFunction, UserStore } from "authentication-module/dist/authenticator";
import { SecretKeyProvider } from "authentication-module/dist/jwt-serializer";
import { PostProcessorRegistry } from "../controller/post-processor";
import { NoteTypesRegistry } from "../registries/note-types-registry";
import { NoteStore } from "../stores/note/note-store";
import { NotebookStore } from "../stores/notebook/notebook-store";
import { PersonStore } from "../stores/person/person-store";
import { HttpRedirectView } from "../views/http-redirect-view";
import { NoteHtmlView } from "../views/note/note-html-view";
import { NotebookHtmlView } from "../views/notebook/notebook-html-view";
import { PersonHtmlView } from "../views/person/person-html-view";
export interface ServiceConfiguration {
    authenticator: Authenticator;
    jwtSerializerSecretProvider: SecretKeyProvider;
    notebookStore: NotebookStore;
    personStore: PersonStore;
    noteStore: NoteStore;
    noteTypesRegistry: NoteTypesRegistry;
    postProcessorRegistry: PostProcessorRegistry;
    passwordHashingFunction: PasswordHashingFunction;
    userStore: UserStore;
    baseUrl: string;
}
export declare type ServiceConfigurationOverrides = Partial<ServiceConfiguration>;
export declare const dependenciesConfiguration: (overrides: ServiceConfigurationOverrides) => ServiceConfiguration;
export declare const notebookControllerConfiguration: (overrides: ServiceConfigurationOverrides) => {
    authenticator: Authenticator;
    jwtSerializerSecretProvider: SecretKeyProvider;
    notebookStore: NotebookStore;
    personStore: PersonStore;
    noteStore: NoteStore;
    noteTypesRegistry: NoteTypesRegistry;
    postProcessorRegistry: PostProcessorRegistry;
    passwordHashingFunction: PasswordHashingFunction;
    userStore: UserStore;
    baseUrl: string;
    entityView: NotebookHtmlView;
    httpRedirectView: HttpRedirectView;
    entityStore: NotebookStore;
    noteHtmlView: NoteHtmlView;
};
export declare const personControllerConfiguration: (overrides: ServiceConfigurationOverrides) => {
    authenticator: Authenticator;
    jwtSerializerSecretProvider: SecretKeyProvider;
    notebookStore: NotebookStore;
    personStore: PersonStore;
    noteStore: NoteStore;
    noteTypesRegistry: NoteTypesRegistry;
    postProcessorRegistry: PostProcessorRegistry;
    passwordHashingFunction: PasswordHashingFunction;
    userStore: UserStore;
    baseUrl: string;
    entityView: PersonHtmlView;
    httpRedirectView: HttpRedirectView;
    entityStore: PersonStore;
};
export declare const noteControllerConfiguration: (overrides: ServiceConfigurationOverrides) => {
    authenticator: Authenticator;
    jwtSerializerSecretProvider: SecretKeyProvider;
    notebookStore: NotebookStore;
    personStore: PersonStore;
    noteStore: NoteStore;
    noteTypesRegistry: NoteTypesRegistry;
    postProcessorRegistry: PostProcessorRegistry;
    passwordHashingFunction: PasswordHashingFunction;
    userStore: UserStore;
    baseUrl: string;
    httpRedirectView: HttpRedirectView;
    entityStore: NoteStore;
};
