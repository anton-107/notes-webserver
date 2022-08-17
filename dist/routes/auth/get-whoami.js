"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWhoamiHandler = exports.IdentityPage = void 0;
const configuration_1 = require("../../configuration/configuration");
const cookie_parser_1 = require("../../http/cookie-parser");
const http_1 = require("../../http/http");
class IdentityPage {
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
exports.IdentityPage = IdentityPage;
const getWhoamiHandler = async (request) => {
    return await new IdentityPage({
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        ...(0, configuration_1.dependenciesConfiguration)({}),
    }).render();
};
exports.getWhoamiHandler = getWhoamiHandler;
//# sourceMappingURL=get-whoami.js.map