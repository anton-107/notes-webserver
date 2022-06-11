"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSigninHandler = exports.SigninPage = void 0;
const configuration_1 = require("../configuration/configuration");
const http_1 = require("../http");
class SigninPage {
    constructor(properties) {
        this.properties = properties;
    }
    async render() {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
            body: `<form method='post' action='${this.properties.baseUrl}/signin'>
        <input name='user-login' data-testid='user-login' />
        <input name='user-password' data-testid='user-password' type='password' />
        <input type='submit' />
      </form>`,
        };
    }
}
exports.SigninPage = SigninPage;
const getSigninHandler = async () => {
    return await new SigninPage({ ...(0, configuration_1.dependenciesConfiguration)({}) }).render();
};
exports.getSigninHandler = getSigninHandler;
//# sourceMappingURL=get-signin.js.map