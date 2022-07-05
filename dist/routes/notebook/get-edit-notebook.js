"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditNotebookHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const notebook_controller_1 = require("../../controller/notebook/notebook-controller");
const cookie_parser_1 = require("../../http/cookie-parser");
const notebook_html_view_1 = require("../../views/notebook/notebook-html-view");
const getEditNotebookHandler = async (request) => {
    const configuration = (0, configuration_1.dependenciesConfiguration)({});
    const properties = {
        ...configuration,
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        entityView: new notebook_html_view_1.NotebookHtmlView({ ...configuration }),
        entityStore: configuration.notebookStore,
    };
    return await new notebook_controller_1.NotebookController(properties).showEditSingleEntityPage(request.pathParameters.notebookID);
};
exports.getEditNotebookHandler = getEditNotebookHandler;
//# sourceMappingURL=get-edit-notebook.js.map