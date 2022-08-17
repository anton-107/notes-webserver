"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteControllerConfiguration = exports.personControllerConfiguration = exports.notebookControllerConfiguration = exports.dependenciesConfiguration = void 0;
const cors_headers_1 = require("../http/cors-headers");
const http_redirect_view_1 = require("../views/http-redirect-view");
const note_html_view_1 = require("../views/note/note-html-view");
const notebook_html_view_1 = require("../views/notebook/notebook-html-view");
const person_html_view_1 = require("../views/person/person-html-view");
const common_1 = require("./common");
const jwt_serializer_secrets_manager_1 = require("./jwt-serializer-secrets-manager");
const note_store_dynamo_1 = require("./note-store-dynamo");
const notebook_store_dynamo_1 = require("./notebook-store-dynamo");
const person_store_dynamo_1 = require("./person-store-dynamo");
const user_store_dynamo_1 = require("./user-store-dynamo");
const dependenciesConfiguration = (overrides) => {
    const contextConfiguration = {};
    if (process.env["USER_STORE_TYPE"] === "dynamodb") {
        Object.assign(contextConfiguration, (0, user_store_dynamo_1.userStoreDynamoConfiguration)());
    }
    if (process.env["NOTEBOOK_STORE_TYPE"] === "dynamodb") {
        Object.assign(contextConfiguration, (0, notebook_store_dynamo_1.notebookStoreDynamoConfiguration)());
    }
    if (process.env["NOTE_STORE_TYPE"] === "dynamodb") {
        Object.assign(contextConfiguration, (0, note_store_dynamo_1.noteStoreDynamoConfiguration)());
    }
    if (process.env["PERSON_STORE_TYPE"] === "dynamodb") {
        Object.assign(contextConfiguration, (0, person_store_dynamo_1.personStoreDynamoConfiguration)());
    }
    if (process.env["JWT_SERIALIZER_SECRET_ID"]) {
        Object.assign(contextConfiguration, (0, jwt_serializer_secrets_manager_1.jwtSerializerSecretsManagerConfiguration)(process.env["JWT_SERIALIZER_SECRET_ID"]));
    }
    contextConfiguration.baseUrl = process.env["BASE_URL"] || "";
    const configuration = (0, common_1.commonConfiguration)({
        ...contextConfiguration,
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
        entityStore: configuration.notebookStore,
        noteStore: configuration.noteStore,
        noteHtmlView: new note_html_view_1.NoteHtmlView({ ...configuration }),
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
        entityStore: configuration.noteStore,
        ...overrides,
    };
};
exports.noteControllerConfiguration = noteControllerConfiguration;
//# sourceMappingURL=configuration.js.map