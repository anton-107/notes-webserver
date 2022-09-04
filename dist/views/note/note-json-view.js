"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteJsonView = void 0;
const http_1 = require("../../http/http");
const note_html_view_1 = require("./note-html-view");
class NoteJsonView extends note_html_view_1.NoteHtmlView {
    renderDetailsPageOneEntity(entity) {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                ...this.properties.corsHeaders,
            },
            body: JSON.stringify(entity),
        };
    }
}
exports.NoteJsonView = NoteJsonView;
//# sourceMappingURL=note-json-view.js.map