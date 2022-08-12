"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSigninHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const signin_controller_1 = require("../../controller/auth/signin-controller");
const body_parser_1 = require("../../http/body-parser");
const cookie_parser_1 = require("../../http/cookie-parser");
const response_type_parser_1 = require("../../http/response-type-parser");
const postSigninHandler = async (request) => {
    const responseType = (0, response_type_parser_1.parseResponseType)(request.headers);
    return await new signin_controller_1.SigninController({
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        responseType,
        ...(0, configuration_1.dependenciesConfiguration)({}),
    }).render((0, body_parser_1.parseBody)(request));
};
exports.postSigninHandler = postSigninHandler;
//# sourceMappingURL=post-signin.js.map