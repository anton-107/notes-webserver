"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSigninHandler = exports.SigninAction = void 0;
const configuration_1 = require("../configuration/configuration");
const http_1 = require("../http");
class SigninAction {
    constructor(properties) {
        this.properties = properties;
    }
    async render(form) {
        const signinResult = await this.properties.authenticator.signIn(form["user-login"], form["user-password"]);
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.SEE_OTHER,
            headers: {
                Location: "/home",
                "Set-Cookie": `Authentication=${signinResult.accessToken}`,
            },
            body: "",
        };
    }
}
exports.SigninAction = SigninAction;
const postSigninHandler = async (request) => {
    return await new SigninAction({
        authenticationToken: request.authenticationToken,
        ...(0, configuration_1.dependenciesConfiguration)({}),
    }).render(request.postBody);
};
exports.postSigninHandler = postSigninHandler;
//# sourceMappingURL=post-signin.js.map