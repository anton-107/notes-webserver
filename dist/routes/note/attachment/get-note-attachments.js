"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoteAttachmentsHandler = void 0;
const note_controller_builder_1 = require("../../../controller/note/note-controller-builder");
const response_type_parser_1 = require("../../../http/response-type-parser");
const getNoteAttachmentsHandler = async (request) => {
    const controller = note_controller_builder_1.NoteControllerBuilder.build({
        headers: request.headers,
        responseType: (0, response_type_parser_1.parseResponseType)(request.headers),
    });
    return await controller.listAttachments(request.pathParameters.noteID);
};
exports.getNoteAttachmentsHandler = getNoteAttachmentsHandler;
//# sourceMappingURL=get-note-attachments.js.map