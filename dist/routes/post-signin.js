"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSigninHandler = exports.SigninAction = void 0;
const configuration_1 = require("../configuration/configuration");
const body_parser_1 = require("../http/body-parser");
const cookie_parser_1 = require("../http/cookie-parser");
const http_1 = require("../http/http");
class SigninAction {
    constructor(properties) {
        this.properties = properties;
    }
    async render(form) {
        console.log("signin attempt", form["user-login"]);
        const signinResult = await this.properties.authenticator.signIn(form["user-login"], form["user-password"]);
        console.log("signin result", signinResult.isAuthenticated, signinResult.authenticationFailedReason);
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.SEE_OTHER,
            headers: {
                Location: `${this.properties.baseUrl}/home`,
                "Set-Cookie": `Authentication=${signinResult.accessToken}`,
            },
            body: "",
        };
    }
}
exports.SigninAction = SigninAction;
const postSigninHandler = async (request) => {
    return await new SigninAction({
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        ...(0, configuration_1.dependenciesConfiguration)({}),
    }).render((0, body_parser_1.parseBody)(request));
};
exports.postSigninHandler = postSigninHandler;
//# sourceMappingURL=post-signin.js.map