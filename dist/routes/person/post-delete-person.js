"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOnePersonHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const person_controller_1 = require("../../controller/person/person-controller");
const body_parser_1 = require("../../http/body-parser");
const cookie_parser_1 = require("../../http/cookie-parser");
const response_type_parser_1 = require("../../http/response-type-parser");
const person_html_view_1 = require("../../views/person/person-html-view");
const person_json_view_1 = require("../../views/person/person-json-view");
const deleteOnePersonHandler = async (request) => {
    const configuration = (0, configuration_1.personControllerConfiguration)({});
    const requestBody = (0, body_parser_1.parseBody)(request);
    const responseType = (0, response_type_parser_1.parseResponseType)(request.headers);
    return await new person_controller_1.PersonController({
        ...configuration,
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        entityView: responseType === response_type_parser_1.ResponseType.JSON
            ? new person_json_view_1.PersonJsonView({ ...configuration })
            : new person_html_view_1.PersonHtmlView({ ...configuration }),
        responseType: (0, response_type_parser_1.parseResponseType)(request.headers),
    }).performDeleteSingleEntityAction(requestBody["person-id"]);
};
exports.deleteOnePersonHandler = deleteOnePersonHandler;
//# sourceMappingURL=post-delete-person.js.map