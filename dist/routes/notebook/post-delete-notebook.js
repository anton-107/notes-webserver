"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneNotebookHandler = exports.DeleteNotebookAction = void 0;
const configuration_1 = require("../../configuration/configuration");
const http_1 = require("../../http/http");
const body_parser_1 = require("../../http/body-parser");
const cookie_parser_1 = require("../../http/cookie-parser");
class DeleteNotebookAction {
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
        if (!form["notebookID"]) {
            console.error("No notebook id found in request", form);
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.BAD_REQUEST,
                headers: {},
                body: "Bad request.",
            };
        }
        try {
            await this.properties.notebookStore.deleteOne(user.username, form["notebookID"]);
        }
        catch (err) {
            console.log("Could not delete notebook", form, err);
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.INTERNAL_SERVER_ERROR,
                headers: {},
                body: "Internal server error.",
            };
        }
        headers["Location"] = `${this.properties.baseUrl}/home`;
        console.log("notebook deleted", user.username, form);
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.SEE_OTHER,
            headers,
            body: "",
        };
    }
}
exports.DeleteNotebookAction = DeleteNotebookAction;
const deleteOneNotebookHandler = async (request) => {
    return await new DeleteNotebookAction({
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        ...(0, configuration_1.dependenciesConfiguration)({}),
    }).render((0, body_parser_1.parseBody)(request));
};
exports.deleteOneNotebookHandler = deleteOneNotebookHandler;
//# sourceMappingURL=post-delete-notebook.js.map