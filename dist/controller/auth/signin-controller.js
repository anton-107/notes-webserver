"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninController = void 0;
const http_1 = require("../../http/http");
const response_type_parser_1 = require("../../http/response-type-parser");
class SigninController {
    constructor(properties) {
        this.properties = properties;
    }
    async render(form) {
        console.log("signin attempt", form["user-login"]);
        const signinResult = await this.properties.authenticator.signIn(form["user-login"], form["user-password"]);
        console.log("signin result", signinResult.isAuthenticated, signinResult.authenticationFailedReason);
        if (this.properties.responseType === response_type_parser_1.ResponseType.JSON) {
            return {
                isBase64Encoded: false,
                statusCode: signinResult.isAuthenticated
                    ? http_1.HttpStatus.OK
                    : http_1.HttpStatus.FORBIDDEN,
                headers: {
                    "Set-Cookie": `Authentication=${signinResult.accessToken}`,
                    ...this.properties.corsHeaders,
                },
                body: JSON.stringify({
                    isAuthenticated: signinResult.isAuthenticated,
                }),
            };
        }
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
exports.SigninController = SigninController;
//# sourceMappingURL=signin-controller.js.map