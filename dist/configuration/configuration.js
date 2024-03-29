"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteControllerConfiguration = exports.personControllerConfiguration = exports.notebookControllerConfiguration = exports.dependenciesConfiguration = void 0;
const aws_sdk_1 = require("aws-sdk");
const https_1 = require("https");
const youtube_parser_1 = require("youtube-module/dist/youtube-parser");
const cors_headers_1 = require("../http/cors-headers");
const logger_bunyan_1 = require("../logger/logger-bunyan");
const attachments_store_s3_1 = require("../stores/attachments/attachments-store-s3");
const http_bad_request_view_1 = require("../views/http-bad-request-view");
const http_redirect_view_1 = require("../views/http-redirect-view");
const http_status_view_1 = require("../views/http-status-view");
const note_html_view_1 = require("../views/note/note-html-view");
const notebook_html_view_1 = require("../views/notebook/notebook-html-view");
const notebook_json_view_1 = require("../views/notebook/notebook-json-view");
const person_html_view_1 = require("../views/person/person-html-view");
const common_1 = require("./common");
const jwt_serializer_secrets_manager_1 = require("./jwt-serializer-secrets-manager");
const note_store_dynamo_1 = require("./note-store-dynamo");
const notebook_store_dynamo_1 = require("./notebook-store-dynamo");
const person_store_dynamo_1 = require("./person-store-dynamo");
const search_store_opensearch_serverless_1 = require("./search-store-opensearch-serverless");
const state_machines_1 = require("./state-machines");
const user_store_dynamo_1 = require("./user-store-dynamo");
const configurationOverrides = [
    (contextConfiguration, logger) => {
        if (process.env["USER_STORE_TYPE"] === "dynamodb") {
            Object.assign(contextConfiguration, (0, user_store_dynamo_1.userStoreDynamoConfiguration)(logger));
        }
    },
    (contextConfiguration, logger) => {
        if (process.env["NOTEBOOK_STORE_TYPE"] === "dynamodb") {
            Object.assign(contextConfiguration, (0, notebook_store_dynamo_1.notebookStoreDynamoConfiguration)(logger));
        }
    },
    (contextConfiguration, logger) => {
        if (process.env["NOTE_STORE_TYPE"] === "dynamodb") {
            Object.assign(contextConfiguration, (0, note_store_dynamo_1.noteStoreDynamoConfiguration)(logger));
        }
    },
    (contextConfiguration, logger) => {
        if (process.env["NOTE_ATTACHMENTS_STORE_TYPE"] === "dynamodb") {
            Object.assign(contextConfiguration, (0, note_store_dynamo_1.noteAttachmentsStoreDynamoConfiguration)(logger));
        }
    },
    (contextConfiguration, logger) => {
        if (process.env["PERSON_STORE_TYPE"] === "dynamodb") {
            Object.assign(contextConfiguration, (0, person_store_dynamo_1.personStoreDynamoConfiguration)(logger));
        }
    },
    (contextConfiguration, logger) => {
        if (process.env["JWT_SERIALIZER_SECRET_ID"]) {
            Object.assign(contextConfiguration, (0, jwt_serializer_secrets_manager_1.jwtSerializerSecretsManagerConfiguration)(logger, process.env["JWT_SERIALIZER_SECRET_ID"]));
        }
    },
    (contextConfiguration) => {
        if (process.env["YOUTUBE_PARSER_ENABLED"] === "true") {
            contextConfiguration.youtubeParser = new youtube_parser_1.YoutubeParser({
                httpClient: { get: https_1.get },
            });
        }
    },
    (contextConfiguration, logger) => {
        if (process.env["S3_ATTACHMENTS_BUCKET"]) {
            contextConfiguration.attachmentsStore = new attachments_store_s3_1.AttachmentsStoreS3({
                logger,
                s3: new aws_sdk_1.S3(),
                bucketName: process.env["S3_ATTACHMENTS_BUCKET"],
                folderName: process.env["S3_ATTACHMENTS_FOLDER"],
            });
        }
    },
    (contextConfiguration, logger) => {
        if (process.env["SEARCH_DOMAIN_SERVERLESS_ENDPOINT"]) {
            Object.assign(contextConfiguration, (0, search_store_opensearch_serverless_1.searchStoreOpensearchServerlessConfiguration)(logger, process.env["SEARCH_DOMAIN_SERVERLESS_ENDPOINT"], process.env["SEARCH_INDEX_NAME"]));
        }
    },
    (contextConfiguration, logger) => {
        if (process.env["NOTEBOOK_DELETION_STATE_MACHINE_ARN"]) {
            Object.assign(contextConfiguration, (0, state_machines_1.notebookDeletionStateMachineConfiguration)(logger, process.env["NOTEBOOK_DELETION_STATE_MACHINE_ARN"]));
        }
    },
];
const contextConfiguration = () => {
    const logger = new logger_bunyan_1.LoggerBunyan();
    const contextConfiguration = {};
    contextConfiguration.logger = logger;
    configurationOverrides.forEach((configurationOverride) => {
        configurationOverride(contextConfiguration, logger);
    });
    contextConfiguration.baseUrl = process.env["BASE_URL"] || "";
    return contextConfiguration;
};
const dependenciesConfiguration = (overrides) => {
    const configuration = (0, common_1.commonConfiguration)({
        ...contextConfiguration(),
        ...overrides,
    });
    if (process.env["CORS_ALLOWED_ORIGINS"]) {
        configuration.corsHeaders = (0, cors_headers_1.corsHeaders)(process.env["CORS_ALLOWED_ORIGINS"]);
    }
    return configuration;
};
exports.dependenciesConfiguration = dependenciesConfiguration;
const notebookControllerConfiguration = (overrides) => {
    const configuration = (0, exports.dependenciesConfiguration)({});
    return {
        ...configuration,
        entityView: new notebook_html_view_1.NotebookHtmlView({ ...configuration }),
        httpRedirectView: new http_redirect_view_1.HttpRedirectView({ ...configuration }),
        httpStatusView: new http_status_view_1.HttpStatusView(),
        httpBadRequestView: new http_bad_request_view_1.HttpBadRequestView(),
        entityStore: configuration.notebookStore,
        noteStore: configuration.noteStore,
        noteHtmlView: new note_html_view_1.NoteHtmlView({ ...configuration }),
        notebookJsonView: new notebook_json_view_1.NotebookJsonView({ ...configuration }),
        ...overrides,
    };
};
exports.notebookControllerConfiguration = notebookControllerConfiguration;
const personControllerConfiguration = (overrides) => {
    const configuration = (0, exports.dependenciesConfiguration)({});
    return {
        ...configuration,
        entityView: new person_html_view_1.PersonHtmlView({ ...configuration }),
        httpRedirectView: new http_redirect_view_1.HttpRedirectView({ ...configuration }),
        httpStatusView: new http_status_view_1.HttpStatusView(),
        httpBadRequestView: new http_bad_request_view_1.HttpBadRequestView(),
        entityStore: configuration.personStore,
        ...overrides,
    };
};
exports.personControllerConfiguration = personControllerConfiguration;
const noteControllerConfiguration = (overrides) => {
    const configuration = (0, exports.dependenciesConfiguration)({});
    return {
        ...configuration,
        httpRedirectView: new http_redirect_view_1.HttpRedirectView({ ...configuration }),
        httpStatusView: new http_status_view_1.HttpStatusView(),
        httpBadRequestView: new http_bad_request_view_1.HttpBadRequestView(),
        entityStore: configuration.noteStore,
        ...overrides,
    };
};
exports.noteControllerConfiguration = noteControllerConfiguration;
//# sourceMappingURL=configuration.js.map