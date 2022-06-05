"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSignoutHandler = exports.SignoutAction = void 0;
const router_1 = require("../router");
class SignoutAction {
    async render() {
        return {
            status: router_1.HttpStatus.OK,
            headers: [
                {
                    headerName: "Set-Cookie",
                    headerValue: `Authentication=;Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
                },
            ],
            body: "<div data-testid='signout-complete'>You are signed out</div>",
        };
    }
}
exports.SignoutAction = SignoutAction;
const postSignoutHandler = async () => {
    return await new SignoutAction().render();
};
exports.postSignoutHandler = postSignoutHandler;
//# sourceMappingURL=post-signout.js.map