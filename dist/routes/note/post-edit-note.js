"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEditNoteHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const note_controller_1 = require("../../controller/note/note-controller");
const body_parser_1 = require("../../http/body-parser");
const cookie_parser_1 = require("../../http/cookie-parser");
const note_html_view_1 = require("../../views/note/note-html-view");
const postEditNoteHandler = async (request) => {
    const configuration = (0, configuration_1.noteControllerConfiguration)({});
    const requestBody = (0, body_parser_1.parseBody)(request);
    return await new note_controller_1.NoteController({
        ...configuration,
        entityView: new note_html_view_1.NoteHtmlView({ ...configuration }),
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        notebookID: null,
        noteType: null,
    }).performUpdateSingleEntityAction(requestBody);
};
exports.postEditNoteHandler = postEditNoteHandler;
//# sourceMappingURL=post-edit-note.js.map