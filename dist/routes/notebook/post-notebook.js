"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNotebookHandler = void 0;
const notebook_controller_builder_1 = require("../../controller/notebook/notebook-controller-builder");
const body_parser_1 = require("../../http/body-parser");
const response_type_parser_1 = require("../../http/response-type-parser");
const postNotebookHandler = async (request) => {
    const requestBody = (0, body_parser_1.parseBody)(request);
    const responseType = (0, response_type_parser_1.parseResponseType)(request.headers);
    const controller = notebook_controller_builder_1.NotebookControllerBuilder.build({
        headers: request.headers,
        responseType,
    });
    return await controller.performCreateSingleEntityAction(requestBody);
};
exports.postNotebookHandler = postNotebookHandler;
//# sourceMappingURL=post-notebook.js.map