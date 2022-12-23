"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEditNoteHandler = void 0;
const note_controller_builder_1 = require("../../controller/note/note-controller-builder");
const body_parser_1 = require("../../http/body-parser");
const response_type_parser_1 = require("../../http/response-type-parser");
const postEditNoteHandler = async (request) => {
    const requestBody = (0, body_parser_1.parseBody)(request);
    const responseType = (0, response_type_parser_1.parseResponseType)(request.headers);
    const controller = note_controller_builder_1.NoteControllerBuilder.build({
        headers: request.headers,
        responseType,
    });
    return await controller.performUpdateSingleEntityAction(requestBody);
};
exports.postEditNoteHandler = postEditNoteHandler;
//# sourceMappingURL=post-edit-note.js.map