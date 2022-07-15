"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditNoteHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const note_controller_1 = require("../../controller/note/note-controller");
const cookie_parser_1 = require("../../http/cookie-parser");
const note_html_view_1 = require("../../views/note/note-html-view");
const getEditNoteHandler = async (request) => {
    const configuration = (0, configuration_1.noteControllerConfiguration)({});
    return await new note_controller_1.NoteController({
        ...configuration,
        entityView: new note_html_view_1.NoteHtmlView({
            ...configuration,
            notebookID: request.pathParameters.notebookID,
        }),
        notebookID: request.pathParameters.notebookID,
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
    }).showEditSingleEntityPage(request.pathParameters.noteID);
};
exports.getEditNoteHandler = getEditNoteHandler;
//# sourceMappingURL=get-edit-note.js.map