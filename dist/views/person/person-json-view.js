"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonJsonView = void 0;
const http_1 = require("../../http/http");
const person_html_view_1 = require("./person-html-view");
class PersonJsonView extends person_html_view_1.PersonHtmlView {
    constructor(properties) {
        super(properties);
        this.properties = properties;
    }
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
}
exports.PersonJsonView = PersonJsonView;
//# sourceMappingURL=person-json-view.js.map