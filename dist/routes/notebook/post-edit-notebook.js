"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEditNotebookHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const notebook_controller_1 = require("../../controller/notebook/notebook-controller");
const body_parser_1 = require("../../http/body-parser");
const cookie_parser_1 = require("../../http/cookie-parser");
const http_redirect_view_1 = require("../../views/http-redirect-view");
const notebook_html_view_1 = require("../../views/notebook/notebook-html-view");
const postEditNotebookHandler = async (request) => {
    const configuration = (0, configuration_1.dependenciesConfiguration)({});
    const properties = {
        ...configuration,
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        entityView: new notebook_html_view_1.NotebookHtmlView({ ...configuration }),
        httpRedirectView: new http_redirect_view_1.HttpRedirectView({ ...configuration }),
        entityStore: configuration.notebookStore,
    };
    const requestBody = (0, body_parser_1.parseBody)(request);
    return await new notebook_controller_1.NotebookController(properties).performUpdateSingleEntityAction(requestBody);
};
exports.postEditNotebookHandler = postEditNotebookHandler;
//# sourceMappingURL=post-edit-notebook.js.map