"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSigninHandler = exports.SigninAction = void 0;
const configuration_1 = require("../configuration/configuration");
const router_1 = require("../router");
class SigninAction {
    constructor(properties) {
        this.properties = properties;
    }
    async render(form) {
        const signinResult = await this.properties.authenticator.signIn(form["user-login"], form["user-password"]);
        return {
            status: router_1.HttpStatus.SEE_OTHER,
            headers: [
                {
                    headerName: "Location",
                    headerValue: "/home",
                },
                {
                    headerName: "Set-Cookie",
                    headerValue: `Authentication=${signinResult.accessToken}`,
                },
            ],
            body: "",
        };
    }
}
exports.SigninAction = SigninAction;
const postSigninHandler = async (request) => {
    return await new SigninAction({
        authenticationToken: request.authenticationToken,
        ...(0, configuration_1.dependenciesConfiguration)(),
    }).render(request.postBody);
};
exports.postSigninHandler = postSigninHandler;
//# sourceMappingURL=post-signin.js.map