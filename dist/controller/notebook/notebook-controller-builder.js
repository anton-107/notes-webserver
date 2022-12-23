"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookControllerBuilder = void 0;
const configuration_1 = require("../../configuration/configuration");
const cookie_parser_1 = require("../../http/cookie-parser");
const response_type_parser_1 = require("../../http/response-type-parser");
const notebook_html_view_1 = require("../../views/notebook/notebook-html-view");
const notebook_json_view_1 = require("../../views/notebook/notebook-json-view");
const notebook_controller_1 = require("./notebook-controller");
class NotebookControllerBuilder {
    static build(properties) {
        const configuration = (0, configuration_1.notebookControllerConfiguration)({});
        return new notebook_controller_1.NotebookController({
            ...configuration,
            entityView: properties.responseType === response_type_parser_1.ResponseType.JSON
                ? new notebook_json_view_1.NotebookJsonView({ ...configuration })
                : new notebook_html_view_1.NotebookHtmlView({ ...configuration }),
            authenticationToken: (0, cookie_parser_1.parseCookie)(properties.headers, "Authentication"),
            responseType: (0, response_type_parser_1.parseResponseType)(properties.headers),
        });
    }
}
exports.NotebookControllerBuilder = NotebookControllerBuilder;
//# sourceMappingURL=notebook-controller-builder.js.map