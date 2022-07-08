"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRedirectView = void 0;
const http_1 = require("../http/http");
class HttpRedirectView {
    constructor(properties) {
        this.properties = properties;
    }
    showRedirect(location) {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.SEE_OTHER,
            headers: {
                Location: `${this.properties.baseUrl}${location}`,
            },
            body: "",
        };
    }
}
exports.HttpRedirectView = HttpRedirectView;
//# sourceMappingURL=http-redirect-view.js.map