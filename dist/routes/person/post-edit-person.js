"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEditPersonHandler = void 0;
const person_controller_builder_1 = require("../../controller/person/person-controller-builder");
const body_parser_1 = require("../../http/body-parser");
const response_type_parser_1 = require("../../http/response-type-parser");
const postEditPersonHandler = async (request) => {
    const requestBody = (0, body_parser_1.parseBody)(request);
    const responseType = (0, response_type_parser_1.parseResponseType)(request.headers);
    const controller = person_controller_builder_1.PersonControllerBuilder.build({
        headers: request.headers,
        responseType,
    });
    return await controller.performUpdateSingleEntityAction(requestBody);
};
exports.postEditPersonHandler = postEditPersonHandler;
//# sourceMappingURL=post-edit-person.js.map