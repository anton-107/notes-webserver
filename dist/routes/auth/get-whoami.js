"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWhoamiHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const identity_page_controller_1 = require("../../controller/auth/identity-page-controller");
const cookie_parser_1 = require("../../http/cookie-parser");
const getWhoamiHandler = async (request) => {
    return await new identity_page_controller_1.IdentityPageController({
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        ...(0, configuration_1.dependenciesConfiguration)({}),
    }).render();
};
exports.getWhoamiHandler = getWhoamiHandler;
//# sourceMappingURL=get-whoami.js.map