"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomeHandler = void 0;
const home_page_controller_1 = require("../controller/home/home-page-controller");
const cookie_parser_1 = require("../http/cookie-parser");
const configuration_1 = require("./../configuration/configuration");
const getHomeHandler = async (request) => {
    return await new home_page_controller_1.HomePageController({
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        ...(0, configuration_1.dependenciesConfiguration)({}),
    }).render();
};
exports.getHomeHandler = getHomeHandler;
//# sourceMappingURL=get-home.js.map