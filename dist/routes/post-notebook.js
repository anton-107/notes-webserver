"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNotebookHandler = exports.CreateNotebookAction = void 0;
const configuration_1 = require("../configuration/configuration");
const http_1 = require("../http/http");
const body_parser_1 = require("../http/body-parser");
const cookie_parser_1 = require("../http/cookie-parser");
class CreateNotebookAction {
    constructor(properties) {
        this.properties = properties;
    }
    async render(form) {
        const headers = {};
        const user = await this.properties.authenticator.authenticate(this.properties.authenticationToken);
        await this.properties.notebookStore.add({
            name: form["notebook-name"],
            owner: user.username,
        });
        headers["Location"] = `${this.properties.baseUrl}/home`;
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.SEE_OTHER,
            headers,
            body: "",
        };
    }
}
exports.CreateNotebookAction = CreateNotebookAction;
const postNotebookHandler = async (request) => {
    return await new CreateNotebookAction({
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        ...(0, configuration_1.dependenciesConfiguration)({}),
    }).render((0, body_parser_1.parseBody)(request));
};
exports.postNotebookHandler = postNotebookHandler;
//# sourceMappingURL=post-notebook.js.map