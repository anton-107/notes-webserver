import { YoutubeParser } from "youtube-module/dist/youtube-parser";

import { resetConfigurationCache } from "../../src/configuration/common";
import { dependenciesConfiguration } from "../../src/configuration/configuration";
import { AttachmentsStoreS3 } from "../../src/stores/attachments/attachments-store-s3";
import { NoteAttachmentsStoreDynamodb } from "../../src/stores/note/note-attachments-store-dynamodb";
import { SearchStoreOpensearchServerless } from "../../src/stores/search/search-store-opensearch-serverless";
import { AWSStepFunctionsExecutor } from "../../src/workflows/aws-step-functions-executor";

describe("Configuration", () => {
  const env = Object.assign({}, process.env);

  afterEach(() => {
    process.env = env;
    resetConfigurationCache();
  });

  it("should be idempotent", () => {
    const config1 = dependenciesConfiguration({});
    const config2 = dependenciesConfiguration({});
    expect(config1).toBe(config2);
  });

  it("should set up user store in dynamodb", () => {
    process.env = Object.assign({}, process.env, {
      USER_STORE_TYPE: "dynamodb",
    });
    const config = dependenciesConfiguration({});
    expect(config.userStore).not.toBe(null);
  });

  it("should set up notebook store in dynamodb", () => {
    process.env = Object.assign({}, process.env, {
      NOTEBOOK_STORE_TYPE: "dynamodb",
    });
    const config = dependenciesConfiguration({});
    expect(config.notebookStore).not.toBe(null);
  });

  it("should set up note store in dynamodb", () => {
    process.env = Object.assign({}, process.env, {
      NOTE_STORE_TYPE: "dynamodb",
    });
    const config = dependenciesConfiguration({});
    expect(config.notebookStore).not.toBe(null);
  });

  it("should set up note attachments store in dynamodb", () => {
    process.env = Object.assign({}, process.env, {
      NOTE_ATTACHMENTS_STORE_TYPE: "dynamodb",
    });
    const config = dependenciesConfiguration({});
    expect(config.noteAttachmentsStore).toBeInstanceOf(
      NoteAttachmentsStoreDynamodb
    );
  });

  it("should set up person store in dynamodb", () => {
    process.env = Object.assign({}, process.env, {
      PERSON_STORE_TYPE: "dynamodb",
    });
    const config = dependenciesConfiguration({});
    expect(config.personStore).not.toBe(null);
  });

  it("should secrets manager provider as jwtSerializerSecretProvider", () => {
    process.env = Object.assign({}, process.env, {
      JWT_SERIALIZER_SECRET_ID: "jwtSerializerSecretRANDOM-STRING-SUFFIX",
    });
    const config = dependenciesConfiguration({});
    expect(config.jwtSerializerSecretProvider).not.toBe(null);
  });

  it("should set up cors allowed origins", () => {
    process.env = Object.assign({}, process.env, {
      CORS_ALLOWED_ORIGINS: "http://localhost:1234",
    });
    const config = dependenciesConfiguration({});
    expect(config.corsHeaders["Access-Control-Allow-Origin"]).toBe(
      "http://localhost:1234"
    );
    expect(config.corsHeaders["Access-Control-Allow-Credentials"]).toBe("true");
  });

  it("should set up youtube parser", () => {
    process.env = Object.assign({}, process.env, {
      YOUTUBE_PARSER_ENABLED: "true",
    });
    const config = dependenciesConfiguration({});
    expect(config.youtubeParser).toBeInstanceOf(YoutubeParser);
  });

  it("attachments store to s3", () => {
    process.env = Object.assign({}, process.env, {
      S3_ATTACHMENTS_BUCKET: "my-bucket",
      S3_ATTACHMENTS_FOLDER: "my-folder",
    });
    const config = dependenciesConfiguration({});
    expect(config.attachmentsStore).toBeInstanceOf(AttachmentsStoreS3);
  });

  it("should set up search store", () => {
    process.env = Object.assign({}, process.env, {
      SEARCH_DOMAIN_SERVERLESS_ENDPOINT: "my-endpoint",
      SEARCH_INDEX_NAME: "my-index",
    });
    const config = dependenciesConfiguration({});
    expect(config.searchStore).toBeInstanceOf(SearchStoreOpensearchServerless);
  });

  it("should set up step functions executor", () => {
    process.env = Object.assign({}, process.env, {
      NOTEBOOK_DELETION_STATE_MACHINE_ARN: "notrbook-deletion-workflow",
    });
    const config = dependenciesConfiguration({});
    expect(config.notebookDeletionStateMachine).toBeInstanceOf(
      AWSStepFunctionsExecutor
    );
  });
});
