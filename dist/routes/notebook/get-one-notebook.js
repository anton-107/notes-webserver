"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneNotebookHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const notebook_controller_1 = require("../../controller/notebook/notebook-controller");
const cookie_parser_1 = require("../../http/cookie-parser");
const response_type_parser_1 = require("../../http/response-type-parser");
const notebook_json_view_1 = require("../../views/notebook/notebook-json-view");
const getOneNotebookHandler = async (request) => {
    const responseType = (0, response_type_parser_1.parseResponseType)(request.headers);
    const configuration = {
        ...(0, configuration_1.notebookControllerConfiguration)({}),
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        responseType: (0, response_type_parser_1.parseResponseType)(request.headers)
    };
    if (responseType === response_type_parser_1.ResponseType.JSON) {
        configuration.entityView = new notebook_json_view_1.NotebookJsonView(configuration);
    }
    return await new notebook_controller_1.NotebookController(configuration).showSingleEntityDetailsPage(request.pathParameters.notebookID);
};
exports.getOneNotebookHandler = getOneNotebookHandler;
//# sourceMappingURL=get-one-notebook.js.map