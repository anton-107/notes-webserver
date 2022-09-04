"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotesInNotebookHandler = void 0;
const configuration_1 = require("../../configuration/configuration");
const note_controller_1 = require("../../controller/note/note-controller");
const cookie_parser_1 = require("../../http/cookie-parser");
const response_type_parser_1 = require("../../http/response-type-parser");
const note_json_view_1 = require("../../views/note/note-json-view");
const getAllNotesInNotebookHandler = async (request) => {
    const configuration = (0, configuration_1.noteControllerConfiguration)({});
    return await new note_controller_1.NoteController({
        ...configuration,
        notebookID: request.pathParameters.notebookID,
        noteType: null,
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        entityView: new note_json_view_1.NoteJsonView({ ...configuration }),
        responseType: (0, response_type_parser_1.parseResponseType)(request.headers),
    }).showNotesInNotebook(request.pathParameters.notebookID);
};
exports.getAllNotesInNotebookHandler = getAllNotesInNotebookHandler;
//# sourceMappingURL=get-all-notes-in-notebook.js.map