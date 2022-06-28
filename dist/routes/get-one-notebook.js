"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneNotebookHandler = exports.NotebookDetailsPage = void 0;
const configuration_1 = require("../configuration/configuration");
const cookie_parser_1 = require("../http/cookie-parser");
const http_1 = require("../http/http");
class NotebookDetailsPage {
    constructor(properties) {
        this.properties = properties;
    }
    async render() {
        const user = await this.properties.authenticator.authenticate(this.properties.authenticationToken);
        if (!user.isAuthenticated) {
            console.error("User is not authenticated", user);
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.FORBIDDEN,
                headers: {},
                body: "Forbidden.",
            };
        }
        const notebook = await this.properties.notebookStore.getOne(user.username, this.properties.notebookID);
        if (!notebook) {
            console.error("Notebook is not found for user ", user.username, this.properties.notebookID);
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.NOT_FOUND,
                headers: {},
                body: "Not found.",
            };
        }
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
            body: `<h1  data-testid='notebook-name'>${notebook.name}</h1>`,
        };
    }
}
exports.NotebookDetailsPage = NotebookDetailsPage;
const getOneNotebookHandler = async (request) => {
    return await new NotebookDetailsPage({
        ...(0, configuration_1.dependenciesConfiguration)({}),
        notebookID: request.pathParameters.notebookID,
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
    }).render();
};
exports.getOneNotebookHandler = getOneNotebookHandler;
//# sourceMappingURL=get-one-notebook.js.map