"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEditNotebookHandler = exports.EditNotebookAction = void 0;
const configuration_1 = require("../../configuration/configuration");
const http_1 = require("../../http/http");
const body_parser_1 = require("../../http/body-parser");
const cookie_parser_1 = require("../../http/cookie-parser");
class EditNotebookAction {
    constructor(properties) {
        this.properties = properties;
    }
    async render(form) {
        const headers = {};
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
        try {
            await this.properties.notebookStore.editOne({
                id: form["notebook-id"],
                name: form["notebook-name"],
                owner: user.username,
            });
        }
        catch (err) {
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.INTERNAL_SERVER_ERROR,
                headers: {},
                body: "Internal server error.",
            };
        }
        headers["Location"] = `${this.properties.baseUrl}/home`;
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.SEE_OTHER,
            headers,
            body: "",
        };
    }
}
exports.EditNotebookAction = EditNotebookAction;
const postEditNotebookHandler = async (request) => {
    return await new EditNotebookAction({
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        ...(0, configuration_1.dependenciesConfiguration)({}),
    }).render((0, body_parser_1.parseBody)(request));
};
exports.postEditNotebookHandler = postEditNotebookHandler;
//# sourceMappingURL=post-edit-notebook.js.map