"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAttachmentHandler = void 0;
const note_controller_builder_1 = require("../../../controller/note/note-controller-builder");
const response_type_parser_1 = require("../../../http/response-type-parser");
const downloadAttachmentHandler = async (request) => {
    const controller = note_controller_builder_1.NoteControllerBuilder.build({
        headers: request.headers,
        responseType: (0, response_type_parser_1.parseResponseType)(request.headers),
    });
    return await controller.downloadAttachment(request.pathParameters.noteID, request.pathParameters.attachmentID);
};
exports.downloadAttachmentHandler = downloadAttachmentHandler;
//# sourceMappingURL=download-attachment.js.map