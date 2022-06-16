"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookie = void 0;
const querystring_1 = require("querystring");
function parseCookie(headers, cookieName) {
    const cookieHeader = String(headers["Cookie"] || headers["cookie"]);
    const parts = (0, querystring_1.parse)(cookieHeader);
    if (!parts || !parts[cookieName]) {
        return null;
    }
    return String(parts[cookieName]);
}
exports.parseCookie = parseCookie;
//# sourceMappingURL=cookie-parser.js.map