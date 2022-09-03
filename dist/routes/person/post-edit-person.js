"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEditPersonHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const person_controller_1 = require("../../controller/person/person-controller");
const body_parser_1 = require("../../http/body-parser");
const cookie_parser_1 = require("../../http/cookie-parser");
const response_type_parser_1 = require("../../http/response-type-parser");
const postEditPersonHandler = async (request) => {
    const requestBody = (0, body_parser_1.parseBody)(request);
    return await new person_controller_1.PersonController({
        ...(0, configuration_1.personControllerConfiguration)({}),
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        responseType: (0, response_type_parser_1.parseResponseType)(request.headers)
    }).performUpdateSingleEntityAction(requestBody);
};
exports.postEditPersonHandler = postEditPersonHandler;
//# sourceMappingURL=post-edit-person.js.map