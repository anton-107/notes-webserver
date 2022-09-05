"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEditNoteHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const note_controller_1 = require("../../controller/note/note-controller");
const body_parser_1 = require("../../http/body-parser");
const cookie_parser_1 = require("../../http/cookie-parser");
const response_type_parser_1 = require("../../http/response-type-parser");
const note_html_view_1 = require("../../views/note/note-html-view");
const note_json_view_1 = require("../../views/note/note-json-view");
const postEditNoteHandler = async (request) => {
    const configuration = (0, configuration_1.noteControllerConfiguration)({});
    const requestBody = (0, body_parser_1.parseBody)(request);
    const responseType = (0, response_type_parser_1.parseResponseType)(request.headers);
    return await new note_controller_1.NoteController({
        ...configuration,
        entityView: responseType === response_type_parser_1.ResponseType.JSON
            ? new note_json_view_1.NoteJsonView({ ...configuration })
            : new note_html_view_1.NoteHtmlView({ ...configuration }),
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        notebookID: null,
        noteType: null,
        responseType,
    }).performUpdateSingleEntityAction(requestBody);
};
exports.postEditNoteHandler = postEditNoteHandler;
//# sourceMappingURL=post-edit-note.js.map