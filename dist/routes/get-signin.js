"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSigninHandler = exports.SigninPage = void 0;
const http_1 = require("../http");
class SigninPage {
    async render() {
        return {
            status: http_1.HttpStatus.OK,
            headers: [],
            body: `<form method='post' action='/signin'>
        <input name='user-login' data-testid='user-login' />
        <input name='user-password' data-testid='user-password' type='password' />
        <input type='submit' />
      </form>`,
        };
    }
}
exports.SigninPage = SigninPage;
const getSigninHandler = async () => {
    return await new SigninPage().render();
};
exports.getSigninHandler = getSigninHandler;
//# sourceMappingURL=get-signin.js.map