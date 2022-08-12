"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseResponseType = exports.ResponseType = void 0;
var ResponseType;
(function (ResponseType) {
    ResponseType["JSON"] = "json";
    ResponseType["HTML"] = "html";
})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
function parseResponseType(headers) {
    if (headers["content-type"] &&
        headers["content-type"] === "application/json") {
        return ResponseType.JSON;
    }
    return ResponseType.HTML;
}
exports.parseResponseType = parseResponseType;
//# sourceMappingURL=response-type-parser.js.map