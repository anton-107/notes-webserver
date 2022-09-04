"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNotebookHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const notebook_controller_1 = require("../../controller/notebook/notebook-controller");
const body_parser_1 = require("../../http/body-parser");
const cookie_parser_1 = require("../../http/cookie-parser");
const response_type_parser_1 = require("../../http/response-type-parser");
const postNotebookHandler = async (request) => {
    const requestBody = (0, body_parser_1.parseBody)(request);
    return await new notebook_controller_1.NotebookController({
        ...(0, configuration_1.notebookControllerConfiguration)({}),
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        responseType: (0, response_type_parser_1.parseResponseType)(request.headers),
    }).performCreateSingleEntityAction(requestBody);
};
exports.postNotebookHandler = postNotebookHandler;
//# sourceMappingURL=post-notebook.js.map