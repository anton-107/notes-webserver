"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookJsonView = void 0;
const http_1 = require("../../http/http");
const notebook_html_view_1 = require("./notebook-html-view");
class NotebookJsonView extends notebook_html_view_1.NotebookHtmlView {
    renderDetailsPageOneEntity(entity) {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            body: JSON.stringify(entity),
            headers: {
                ...this.properties.corsHeaders,
            },
        };
    }
    renderSupportedTableColumns(columns) {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            body: JSON.stringify({ columns }),
            headers: {
                ...this.properties.corsHeaders,
            },
        };
    }
}
exports.NotebookJsonView = NotebookJsonView;
//# sourceMappingURL=notebook-json-view.js.map