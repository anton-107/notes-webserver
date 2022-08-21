"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSignoutHandler = exports.SignoutAction = void 0;
const configuration_1 = require("../../configuration/configuration");
const http_1 = require("../../http/http");
class SignoutAction {
    constructor(properties) {
        this.properties = properties;
    }
    async render() {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "Set-Cookie": `Authentication=;Expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=None;Secure`,
                ...this.properties.corsHeaders,
            },
            body: "<div data-testid='signout-complete'>You are signed out</div>",
        };
    }
}
exports.SignoutAction = SignoutAction;
const postSignoutHandler = async () => {
    return await new SignoutAction({
        ...(0, configuration_1.dependenciesConfiguration)({}),
    }).render();
};
exports.postSignoutHandler = postSignoutHandler;
//# sourceMappingURL=post-signout.js.map