"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusView = void 0;
const http_1 = require("../http/http");
class HttpStatusView {
    showForbidden() {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.FORBIDDEN,
            headers: {},
            body: "Forbidden.",
        };
    }
    showInternalServerError() {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.INTERNAL_SERVER_ERROR,
            headers: {},
            body: "Internal server error.",
        };
    }
}
exports.HttpStatusView = HttpStatusView;
//# sourceMappingURL=http-status-view.js.map