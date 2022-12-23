"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityPageController = void 0;
const http_1 = require("../../http/http");
class IdentityPageController {
    constructor(properties) {
        this.properties = properties;
    }
    async render() {
        const authenticationResult = await this.properties.authenticator.authenticate(this.properties.authenticationToken);
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                ...this.properties.corsHeaders,
            },
            body: JSON.stringify({
                isAuthenticated: authenticationResult.isAuthenticated,
                username: authenticationResult.username,
            }),
        };
    }
}
exports.IdentityPageController = IdentityPageController;
//# sourceMappingURL=identity-page-controller.js.map