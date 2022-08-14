"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBody = void 0;
const querystring_1 = require("querystring");
function parseBody(request) {
    if (request.headers["content-type"] &&
        request.headers["content-type"] === "application/json") {
        return JSON.parse(request.body);
    }
    const r = {};
    const parsedForm = (0, querystring_1.parse)(request.body);
    Object.keys(parsedForm).forEach((x) => {
        r[x] = String(parsedForm[x]);
    });
    return r;
}
exports.parseBody = parseBody;
//# sourceMappingURL=body-parser.js.map