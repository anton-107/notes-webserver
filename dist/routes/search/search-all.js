"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAllHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const search_controller_1 = require("../../controller/search/search-controller");
const cookie_parser_1 = require("../../http/cookie-parser");
const searchAllHandler = async (request) => {
    const configuration = (0, configuration_1.dependenciesConfiguration)({});
    return await new search_controller_1.SearchController({
        ...configuration,
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
    }).search(request.queryStringParameters.query);
};
exports.searchAllHandler = searchAllHandler;
//# sourceMappingURL=search-all.js.map