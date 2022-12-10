"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpForbiddenView = void 0;
const http_1 = require("../http/http");
class HttpForbiddenView {
    showForbidden() {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.FORBIDDEN,
            headers: {},
            body: "Forbidden.",
        };
    }
}
exports.HttpForbiddenView = HttpForbiddenView;
//# sourceMappingURL=http-forbidden-view.js.map