"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notebookControllerConfiguration = exports.dependenciesConfiguration = void 0;
const http_redirect_view_1 = require("../views/http-redirect-view");
const notebook_html_view_1 = require("../views/notebook/notebook-html-view");
const common_1 = require("./common");
const jwt_serializer_secrets_manager_1 = require("./jwt-serializer-secrets-manager");
const notebook_store_dynamo_1 = require("./notebook-store-dynamo");
const user_store_dynamo_1 = require("./user-store-dynamo");
const dependenciesConfiguration = (overrides) => {
    const contextConfiguration = {};
    if (process.env["USER_STORE_TYPE"] === "dynamodb") {
        Object.assign(contextConfiguration, (0, user_store_dynamo_1.userStoreDynamoConfiguration)());
    }
    if (process.env["NOTEBOOK_STORE_TYPE"] === "dynamodb") {
        Object.assign(contextConfiguration, (0, notebook_store_dynamo_1.notebookStoreDynamoConfiguration)());
    }
    if (process.env["JWT_SERIALIZER_SECRET_ID"]) {
        Object.assign(contextConfiguration, (0, jwt_serializer_secrets_manager_1.jwtSerializerSecretsManagerConfiguration)(process.env["JWT_SERIALIZER_SECRET_ID"]));
    }
    contextConfiguration.baseUrl = process.env["BASE_URL"] || "";
    return (0, common_1.commonConfiguration)({
        ...contextConfiguration,
        ...overrides,
    });
};
exports.dependenciesConfiguration = dependenciesConfiguration;
const notebookControllerConfiguration = (overrides) => {
    const configuration = (0, exports.dependenciesConfiguration)({});
    return {
        ...configuration,
        entityView: new notebook_html_view_1.NotebookHtmlView({ ...configuration }),
        httpRedirectView: new http_redirect_view_1.HttpRedirectView({ ...configuration }),
        entityStore: configuration.notebookStore,
        ...overrides,
    };
};
exports.notebookControllerConfiguration = notebookControllerConfiguration;
//# sourceMappingURL=configuration.js.map