"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoteAttachmentsHandler = void 0;
const configuration_1 = require("../../../configuration/configuration");
const note_controller_1 = require("../../../controller/note/note-controller");
const cookie_parser_1 = require("../../../http/cookie-parser");
const response_type_parser_1 = require("../../../http/response-type-parser");
const note_html_view_1 = require("../../../views/note/note-html-view");
const getNoteAttachmentsHandler = async (request) => {
    const configuration = (0, configuration_1.noteControllerConfiguration)({});
    return await new note_controller_1.NoteController({
        ...configuration,
        entityView: new note_html_view_1.NoteHtmlView({
            ...configuration,
        }),
        notebookID: null,
        noteType: null,
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        responseType: (0, response_type_parser_1.parseResponseType)(request.headers),
    }).listAttachments(request.pathParameters.noteID);
};
exports.getNoteAttachmentsHandler = getNoteAttachmentsHandler;
//# sourceMappingURL=get-note-attachments.js.map