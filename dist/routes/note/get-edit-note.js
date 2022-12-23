"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditNoteHandler = void 0;
const note_controller_builder_1 = require("../../controller/note/note-controller-builder");
const response_type_parser_1 = require("../../http/response-type-parser");
const getEditNoteHandler = async (request) => {
    const controller = note_controller_builder_1.NoteControllerBuilder.build({
        headers: request.headers,
        responseType: (0, response_type_parser_1.parseResponseType)(request.headers),
        notebookID: request.pathParameters.notebookID,
    });
    return await controller.showEditSingleEntityPage(request.pathParameters.noteID);
};
exports.getEditNoteHandler = getEditNoteHandler;
//# sourceMappingURL=get-edit-note.js.map