"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsHeaders = void 0;
function corsHeaders(allowedOrigins) {
    return {
        "Access-Control-Allow-Origin": allowedOrigins,
        "Access-Control-Allow-Credentials": "true",
    };
}
exports.corsHeaders = corsHeaders;
//# sourceMappingURL=cors-headers.js.map