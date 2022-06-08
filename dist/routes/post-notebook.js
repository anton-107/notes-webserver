"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNotebookHandler = exports.CreateNotebookAction = void 0;
const configuration_1 = require("../configuration/configuration");
const http_1 = require("../http");
class CreateNotebookAction {
    constructor(properties) {
        this.properties = properties;
    }
    async render(form) {
        const headers = {};
        headers["Content-Type"] = "text/html; charset=utf-8";
        const user = await this.properties.authenticator.authenticate(this.properties.authenticationToken);
        await this.properties.notebookStore.add({
            name: form["notebook-name"],
            owner: user.username,
        });
        headers["Location"] = "/home";
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
        authenticationToken: request.authenticationToken,
        ...(0, configuration_1.dependenciesConfiguration)(),
    }).render(request.postBody);
};
exports.postNotebookHandler = postNotebookHandler;
//# sourceMappingURL=post-notebook.js.map