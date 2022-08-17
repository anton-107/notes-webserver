import {
  Authenticator,
  PasswordHashingFunction,
  UserStore,
} from "authentication-module/dist/authenticator";
import { SecretKeyProvider } from "authentication-module/dist/jwt-serializer";
import { PostProcessorRegistry } from "../controller/post-processor";
import { corsHeaders, CORSHeaders } from "../http/cors-headers";
import { NoteTypesRegistry } from "../registries/note-types-registry";
import { NoteStore } from "../stores/note/note-store";
import { NotebookStore } from "../stores/notebook/notebook-store";
import { PersonStore } from "../stores/person/person-store";
import { HttpRedirectView } from "../views/http-redirect-view";
import { NoteHtmlView } from "../views/note/note-html-view";
import { NotebookHtmlView } from "../views/notebook/notebook-html-view";
import { PersonHtmlView } from "../views/person/person-html-view";
import { commonConfiguration } from "./common";
import { jwtSerializerSecretsManagerConfiguration } from "./jwt-serializer-secrets-manager";
import { noteStoreDynamoConfiguration } from "./note-store-dynamo";
import { notebookStoreDynamoConfiguration } from "./notebook-store-dynamo";
import { personStoreDynamoConfiguration } from "./person-store-dynamo";
import { userStoreDynamoConfiguration } from "./user-store-dynamo";

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
  corsHeaders: CORSHeaders;
  baseUrl: string;
}
export type ServiceConfigurationOverrides = Partial<ServiceConfiguration>;

export const dependenciesConfiguration = (
  overrides: ServiceConfigurationOverrides
): ServiceConfiguration => {
  const contextConfiguration: ServiceConfigurationOverrides = {};
  if (process.env["USER_STORE_TYPE"] === "dynamodb") {
    Object.assign(contextConfiguration, userStoreDynamoConfiguration());
  }
  if (process.env["NOTEBOOK_STORE_TYPE"] === "dynamodb") {
    Object.assign(contextConfiguration, notebookStoreDynamoConfiguration());
  }
  if (process.env["NOTE_STORE_TYPE"] === "dynamodb") {
    Object.assign(contextConfiguration, noteStoreDynamoConfiguration());
  }
  if (process.env["PERSON_STORE_TYPE"] === "dynamodb") {
    Object.assign(contextConfiguration, personStoreDynamoConfiguration());
  }
  if (process.env["JWT_SERIALIZER_SECRET_ID"]) {
    Object.assign(
      contextConfiguration,
      jwtSerializerSecretsManagerConfiguration(
        process.env["JWT_SERIALIZER_SECRET_ID"]
      )
    );
  }
  contextConfiguration.baseUrl = process.env["BASE_URL"] || "";

  const configuration = commonConfiguration({
    ...contextConfiguration,
    ...overrides,
  });
  if (process.env["CORS_ALLOWED_ORIGINS"]) {
    configuration.corsHeaders = corsHeaders(
      process.env["CORS_ALLOWED_ORIGINS"]
    );
  }
  return configuration;
};
export const notebookControllerConfiguration = (
  overrides: ServiceConfigurationOverrides
) => {
  const configuration = dependenciesConfiguration({});
  return {
    ...configuration,
    entityView: new NotebookHtmlView({ ...configuration }),
    httpRedirectView: new HttpRedirectView({ ...configuration }),
    entityStore: configuration.notebookStore,
    noteStore: configuration.noteStore,
    noteHtmlView: new NoteHtmlView({ ...configuration }),
    ...overrides,
  };
};
export const personControllerConfiguration = (
  overrides: ServiceConfigurationOverrides
) => {
  const configuration = dependenciesConfiguration({});
  return {
    ...configuration,
    entityView: new PersonHtmlView({ ...configuration }),
    httpRedirectView: new HttpRedirectView({ ...configuration }),
    entityStore: configuration.personStore,
    ...overrides,
  };
};
export const noteControllerConfiguration = (
  overrides: ServiceConfigurationOverrides
) => {
  const configuration = dependenciesConfiguration({});
  return {
    ...configuration,
    httpRedirectView: new HttpRedirectView({ ...configuration }),
    entityStore: configuration.noteStore,
    ...overrides,
  };
};
