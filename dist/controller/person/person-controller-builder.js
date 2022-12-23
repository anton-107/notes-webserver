"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonControllerBuilder = void 0;
const configuration_1 = require("../../configuration/configuration");
const person_controller_1 = require("../../controller/person/person-controller");
const cookie_parser_1 = require("../../http/cookie-parser");
const response_type_parser_1 = require("../../http/response-type-parser");
const person_html_view_1 = require("../../views/person/person-html-view");
const person_json_view_1 = require("../../views/person/person-json-view");
class PersonControllerBuilder {
    static build(properties) {
        const configuration = (0, configuration_1.personControllerConfiguration)({});
        return new person_controller_1.PersonController({
            ...configuration,
            authenticationToken: (0, cookie_parser_1.parseCookie)(properties.headers, "Authentication"),
            responseType: (0, response_type_parser_1.parseResponseType)(properties.headers),
            entityView: properties.responseType === response_type_parser_1.ResponseType.JSON
                ? new person_json_view_1.PersonJsonView({ ...configuration })
                : new person_html_view_1.PersonHtmlView({ ...configuration }),
        });
    }
}
exports.PersonControllerBuilder = PersonControllerBuilder;
//# sourceMappingURL=person-controller-builder.js.map