"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpBadRequestView = void 0;
const http_1 = require("../http/http");
class HttpBadRequestView {
    showBadRequest() {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.BAD_REQUEST,
            headers: {},
            body: "Bad request.",
        };
    }
}
exports.HttpBadRequestView = HttpBadRequestView;
//# sourceMappingURL=http-bad-request-view.js.map