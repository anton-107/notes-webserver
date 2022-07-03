"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditNotebookHandler = exports.NotebookEditPage = void 0;
const configuration_1 = require("../configuration/configuration");
const cookie_parser_1 = require("../http/cookie-parser");
const http_1 = require("../http/http");
class NotebookEditPage {
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
            body: `
        <h1 data-testid='notebook-name'>${notebook.name}</h1>
        <form method='post' action='${this.properties.baseUrl}/notebook/${notebook.id}/edit'>
          <input type='hidden' name='notebook-id' value='${notebook.id}' />
          <input type='text' name='notebook-name' value='${notebook.name}' data-testid='notebook-name-input' />
          <button type='submit' data-testid='edit-notebook-button'>Update</button>
        </form>
        <a href='${this.properties.baseUrl}/notebook/${notebook.id}'>Cancel edit</a>
      `,
        };
    }
}
exports.NotebookEditPage = NotebookEditPage;
const getEditNotebookHandler = async (request) => {
    return await new NotebookEditPage({
        ...(0, configuration_1.dependenciesConfiguration)({}),
        notebookID: request.pathParameters.notebookID,
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
    }).render();
};
exports.getEditNotebookHandler = getEditNotebookHandler;
//# sourceMappingURL=get-edit-notebook.js.map