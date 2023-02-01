import { HttpBadRequestView } from "../views/http-bad-request-view";
import { HttpRedirectView } from "../views/http-redirect-view";
import { HttpStatusView } from "../views/http-status-view";
import { NoteHtmlView } from "../views/note/note-html-view";
import { NotebookHtmlView } from "../views/notebook/notebook-html-view";
import { NotebookJsonView } from "../views/notebook/notebook-json-view";
import { PersonHtmlView } from "../views/person/person-html-view";
import { ServiceConfiguration, ServiceConfigurationOverrides } from "./interfaces";
export declare const dependenciesConfiguration: (overrides: ServiceConfigurationOverrides) => ServiceConfiguration;
export declare const notebookControllerConfiguration: (overrides: ServiceConfigurationOverrides) => {
    logger: import("../logger/logger").Logger;
    authenticator: import("authentication-module/dist/authenticator").Authenticator;
    jwtSerializerSecretProvider: import("authentication-module/dist/jwt-serializer").SecretKeyProvider;
    notebookStore: import("../stores/notebook/notebook-store").NotebookStore;
    personStore: import("../stores/person/person-store").PersonStore;
    noteStore: import("../stores/note/note-store").NoteStore;
    noteTypesRegistry: import("../registries/note-types-registry").NoteTypesRegistry;
    postProcessorRegistry: import("../controller/post-processor").PostProcessorRegistry;
    notebookTableColumnsRegistry: import("../registries/notebook-table-columns-registry").NotebookTableColumnsRegistry;
    passwordHashingFunction: import("authentication-module/dist/authenticator").PasswordHashingFunction;
    userStore: import("authentication-module/dist/authenticator").UserStore;
    corsHeaders: import("../http/cors-headers").CORSHeaders;
    baseUrl: string;
    youtubeParser: import("../actions/fetch-video-information/interfaces").YoutubeParser;
    attachmentsStore: import("../stores/attachments/attachments-store").AttachmentsStore;
    noteAttachmentsStore: import("../stores/note/note-attachments-store").NoteAttachmentsStore;
    searchStore: import("../stores/search/search-store").SearchStore;
    notebookDeletionStateMachine: import("../workflows/interfaces").WorkflowExecutor;
    entityView: NotebookHtmlView;
    httpRedirectView: HttpRedirectView;
    httpStatusView: HttpStatusView;
    httpBadRequestView: HttpBadRequestView;
    entityStore: import("../stores/notebook/notebook-store").NotebookStore;
    noteHtmlView: NoteHtmlView;
    notebookJsonView: NotebookJsonView;
};
export declare const personControllerConfiguration: (overrides: ServiceConfigurationOverrides) => {
    logger: import("../logger/logger").Logger;
    authenticator: import("authentication-module/dist/authenticator").Authenticator;
    jwtSerializerSecretProvider: import("authentication-module/dist/jwt-serializer").SecretKeyProvider;
    notebookStore: import("../stores/notebook/notebook-store").NotebookStore;
    personStore: import("../stores/person/person-store").PersonStore;
    noteStore: import("../stores/note/note-store").NoteStore;
    noteTypesRegistry: import("../registries/note-types-registry").NoteTypesRegistry;
    postProcessorRegistry: import("../controller/post-processor").PostProcessorRegistry;
    notebookTableColumnsRegistry: import("../registries/notebook-table-columns-registry").NotebookTableColumnsRegistry;
    passwordHashingFunction: import("authentication-module/dist/authenticator").PasswordHashingFunction;
    userStore: import("authentication-module/dist/authenticator").UserStore;
    corsHeaders: import("../http/cors-headers").CORSHeaders;
    baseUrl: string;
    youtubeParser: import("../actions/fetch-video-information/interfaces").YoutubeParser;
    attachmentsStore: import("../stores/attachments/attachments-store").AttachmentsStore;
    noteAttachmentsStore: import("../stores/note/note-attachments-store").NoteAttachmentsStore;
    searchStore: import("../stores/search/search-store").SearchStore;
    notebookDeletionStateMachine: import("../workflows/interfaces").WorkflowExecutor;
    entityView: PersonHtmlView;
    httpRedirectView: HttpRedirectView;
    httpStatusView: HttpStatusView;
    httpBadRequestView: HttpBadRequestView;
    entityStore: import("../stores/person/person-store").PersonStore;
};
export declare const noteControllerConfiguration: (overrides: ServiceConfigurationOverrides) => {
    logger: import("../logger/logger").Logger;
    authenticator: import("authentication-module/dist/authenticator").Authenticator;
    jwtSerializerSecretProvider: import("authentication-module/dist/jwt-serializer").SecretKeyProvider;
    notebookStore: import("../stores/notebook/notebook-store").NotebookStore;
    personStore: import("../stores/person/person-store").PersonStore;
    noteStore: import("../stores/note/note-store").NoteStore;
    noteTypesRegistry: import("../registries/note-types-registry").NoteTypesRegistry;
    postProcessorRegistry: import("../controller/post-processor").PostProcessorRegistry;
    notebookTableColumnsRegistry: import("../registries/notebook-table-columns-registry").NotebookTableColumnsRegistry;
    passwordHashingFunction: import("authentication-module/dist/authenticator").PasswordHashingFunction;
    userStore: import("authentication-module/dist/authenticator").UserStore;
    corsHeaders: import("../http/cors-headers").CORSHeaders;
    baseUrl: string;
    youtubeParser: import("../actions/fetch-video-information/interfaces").YoutubeParser;
    attachmentsStore: import("../stores/attachments/attachments-store").AttachmentsStore;
    noteAttachmentsStore: import("../stores/note/note-attachments-store").NoteAttachmentsStore;
    searchStore: import("../stores/search/search-store").SearchStore;
    notebookDeletionStateMachine: import("../workflows/interfaces").WorkflowExecutor;
    httpRedirectView: HttpRedirectView;
    httpStatusView: HttpStatusView;
    httpBadRequestView: HttpBadRequestView;
    entityStore: import("../stores/note/note-store").NoteStore;
};
export { ServiceConfiguration };
