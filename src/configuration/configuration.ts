import {
  Authenticator,
  PasswordHashingFunction,
  UserStore,
} from "authentication-module/dist/authenticator";
import { SecretKeyProvider } from "authentication-module/dist/jwt-serializer";
import { PostProcessorRegistry } from "../controller/post-processor";
import { corsHeaders, CORSHeaders } from "../http/cors-headers";
import { NoteTypesRegistry } from "../registries/note-types-registry";
import { NotebookTableColumnsRegistry } from "../registries/notebook-table-columns-registry";
import { NoteStore } from "../stores/note/note-store";
import { NotebookStore } from "../stores/notebook/notebook-store";
import { PersonStore } from "../stores/person/person-store";
import { HttpRedirectView } from "../views/http-redirect-view";
import { NoteHtmlView } from "../views/note/note-html-view";
import { NotebookHtmlView } from "../views/notebook/notebook-html-view";
import { NotebookJsonView } from "../views/notebook/notebook-json-view";
import { PersonHtmlView } from "../views/person/person-html-view";
import { commonConfiguration } from "./common";
import { jwtSerializerSecretsManagerConfiguration } from "./jwt-serializer-secrets-manager";
import {
  noteAttachmentsStoreDynamoConfiguration,
  noteStoreDynamoConfiguration,
} from "./note-store-dynamo";
import { notebookStoreDynamoConfiguration } from "./notebook-store-dynamo";
import { personStoreDynamoConfiguration } from "./person-store-dynamo";
import { userStoreDynamoConfiguration } from "./user-store-dynamo";
import { YoutubeParser } from "../actions/fetch-video-information";
import { YoutubeParser as YoutubeModuleParser } from "youtube-module/dist/youtube-parser";
import { get } from "https";
import { AttachmentsStore } from "../stores/attachments/attachments-store";
import { AttachmentsStoreS3 } from "../stores/attachments/attachments-store-s3";
import { S3 } from "aws-sdk";
import { NoteAttachmentsStore } from "../stores/note/note-attachments-store";

export interface ServiceConfiguration {
  authenticator: Authenticator;
  jwtSerializerSecretProvider: SecretKeyProvider;
  notebookStore: NotebookStore;
  personStore: PersonStore;
  noteStore: NoteStore;
  noteTypesRegistry: NoteTypesRegistry;
  postProcessorRegistry: PostProcessorRegistry;
  notebookTableColumnsRegistry: NotebookTableColumnsRegistry;
  passwordHashingFunction: PasswordHashingFunction;
  userStore: UserStore;
  corsHeaders: CORSHeaders;
  baseUrl: string;
  youtubeParser: YoutubeParser;
  attachmentsStore: AttachmentsStore;
  noteAttachmentsStore: NoteAttachmentsStore;
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
  if (process.env["NOTE_ATTACHMENTS_STORE_TYPE"] === "dynamodb") {
    Object.assign(
      contextConfiguration,
      noteAttachmentsStoreDynamoConfiguration()
    );
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
  if (process.env["YOUTUBE_PARSER_ENABLED"] === "true") {
    contextConfiguration.youtubeParser = new YoutubeModuleParser({
      httpClient: { get },
    });
  }
  if (process.env["S3_ATTACHMENTS_BUCKET"]) {
    contextConfiguration.attachmentsStore = new AttachmentsStoreS3({
      s3: new S3(),
      bucketName: process.env["S3_ATTACHMENTS_BUCKET"],
      folderName: process.env["S3_ATTACHMENTS_FOLDER"],
    });
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
    notebookJsonView: new NotebookJsonView({ ...configuration }),
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
