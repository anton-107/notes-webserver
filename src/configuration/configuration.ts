import { S3 } from "aws-sdk";
import { get } from "https";
import { YoutubeParser as YoutubeModuleParser } from "youtube-module/dist/youtube-parser";

import { corsHeaders } from "../http/cors-headers";
import { LoggerBunyan } from "../logger/logger-bunyan";
import { AttachmentsStoreS3 } from "../stores/attachments/attachments-store-s3";
import { HttpBadRequestView } from "../views/http-bad-request-view";
import { HttpRedirectView } from "../views/http-redirect-view";
import { HttpStatusView } from "../views/http-status-view";
import { NoteHtmlView } from "../views/note/note-html-view";
import { NotebookHtmlView } from "../views/notebook/notebook-html-view";
import { NotebookJsonView } from "../views/notebook/notebook-json-view";
import { PersonHtmlView } from "../views/person/person-html-view";
import { commonConfiguration } from "./common";
import {
  ServiceConfiguration,
  ServiceConfigurationOverrides,
} from "./interfaces";
import { jwtSerializerSecretsManagerConfiguration } from "./jwt-serializer-secrets-manager";
import {
  noteAttachmentsStoreDynamoConfiguration,
  noteStoreDynamoConfiguration,
} from "./note-store-dynamo";
import { notebookStoreDynamoConfiguration } from "./notebook-store-dynamo";
import { personStoreDynamoConfiguration } from "./person-store-dynamo";
import { searchStoreOpensearchServerlessConfiguration } from "./search-store-opensearch-serverless";
import { userStoreDynamoConfiguration } from "./user-store-dynamo";

const contextConfiguration = (): ServiceConfigurationOverrides => {
  const logger = new LoggerBunyan();
  const contextConfiguration: ServiceConfigurationOverrides = {};
  contextConfiguration.logger = logger;
  if (process.env["USER_STORE_TYPE"] === "dynamodb") {
    Object.assign(contextConfiguration, userStoreDynamoConfiguration(logger));
  }
  if (process.env["NOTEBOOK_STORE_TYPE"] === "dynamodb") {
    Object.assign(
      contextConfiguration,
      notebookStoreDynamoConfiguration(logger)
    );
  }
  if (process.env["NOTE_STORE_TYPE"] === "dynamodb") {
    Object.assign(contextConfiguration, noteStoreDynamoConfiguration(logger));
  }
  if (process.env["NOTE_ATTACHMENTS_STORE_TYPE"] === "dynamodb") {
    Object.assign(
      contextConfiguration,
      noteAttachmentsStoreDynamoConfiguration(logger)
    );
  }
  if (process.env["PERSON_STORE_TYPE"] === "dynamodb") {
    Object.assign(contextConfiguration, personStoreDynamoConfiguration(logger));
  }
  if (process.env["JWT_SERIALIZER_SECRET_ID"]) {
    Object.assign(
      contextConfiguration,
      jwtSerializerSecretsManagerConfiguration(
        logger,
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
      logger,
      s3: new S3(),
      bucketName: process.env["S3_ATTACHMENTS_BUCKET"],
      folderName: process.env["S3_ATTACHMENTS_FOLDER"],
    });
  }
  if (process.env["SEARCH_DOMAIN_SERVERLESS_ENDPOINT"]) {
    Object.assign(
      contextConfiguration,
      searchStoreOpensearchServerlessConfiguration(
        logger,
        process.env["SEARCH_DOMAIN_SERVERLESS_ENDPOINT"],
        process.env["SEARCH_INDEX_NAME"]
      )
    );
  }
  contextConfiguration.baseUrl = process.env["BASE_URL"] || "";
  return contextConfiguration;
};

export const dependenciesConfiguration = (
  overrides: ServiceConfigurationOverrides
): ServiceConfiguration => {
  const configuration = commonConfiguration({
    ...contextConfiguration(),
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
    httpStatusView: new HttpStatusView(),
    httpBadRequestView: new HttpBadRequestView(),
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
    httpStatusView: new HttpStatusView(),
    httpBadRequestView: new HttpBadRequestView(),
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
    httpStatusView: new HttpStatusView(),
    httpBadRequestView: new HttpBadRequestView(),
    entityStore: configuration.noteStore,
    ...overrides,
  };
};
export { ServiceConfiguration };
