"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneNotebookHandler = void 0;
const notebook_controller_builder_1 = require("../../controller/notebook/notebook-controller-builder");
const response_type_parser_1 = require("../../http/response-type-parser");
const getOneNotebookHandler = async (request) => {
    const controller = notebook_controller_builder_1.NotebookControllerBuilder.build({
        headers: request.headers,
        responseType: (0, response_type_parser_1.parseResponseType)(request.headers),
    });
    return await controller.showSingleEntityDetailsPage(request.pathParameters.notebookID);
};
exports.getOneNotebookHandler = getOneNotebookHandler;
//# sourceMappingURL=get-one-notebook.js.map