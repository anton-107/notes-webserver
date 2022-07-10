"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditPersonHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const person_controller_1 = require("../../controller/person/person-controller");
const cookie_parser_1 = require("../../http/cookie-parser");
const getEditPersonHandler = async (request) => {
    return await new person_controller_1.PersonController({
        ...(0, configuration_1.personControllerConfiguration)({}),
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
    }).showEditSingleEntityPage(request.pathParameters.personID);
};
exports.getEditPersonHandler = getEditPersonHandler;
//# sourceMappingURL=get-edit-person.js.map