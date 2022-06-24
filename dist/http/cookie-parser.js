"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookie = void 0;
const cookie_1 = require("cookie");
function parseCookie(headers, cookieName) {
    const cookieHeader = String(headers["Cookie"] || headers["cookie"]);
    const parts = (0, cookie_1.parse)(cookieHeader);
    console.log('parts', parts);
    if (!parts || !parts[cookieName]) {
        return null;
    }
    return String(parts[cookieName]);
}
exports.parseCookie = parseCookie;
//# sourceMappingURL=cookie-parser.js.map