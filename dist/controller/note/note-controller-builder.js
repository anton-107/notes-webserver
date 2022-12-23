"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteControllerBuilder = void 0;
const configuration_1 = require("../../configuration/configuration");
const cookie_parser_1 = require("../../http/cookie-parser");
const response_type_parser_1 = require("../../http/response-type-parser");
const note_html_view_1 = require("../../views/note/note-html-view");
const note_json_view_1 = require("../../views/note/note-json-view");
const note_controller_1 = require("./note-controller");
class NoteControllerBuilder {
    static build(properties) {
        const configuration = (0, configuration_1.noteControllerConfiguration)({});
        return new note_controller_1.NoteController({
            ...configuration,
            entityView: properties.responseType === response_type_parser_1.ResponseType.JSON
                ? new note_json_view_1.NoteJsonView({ ...configuration })
                : new note_html_view_1.NoteHtmlView({
                    ...configuration,
                    notebookID: properties.notebookID,
                }),
            authenticationToken: (0, cookie_parser_1.parseCookie)(properties.headers, "Authentication"),
            notebookID: properties.notebookID,
            noteType: properties.noteType,
            responseType: properties.responseType,
        });
    }
}
exports.NoteControllerBuilder = NoteControllerBuilder;
//# sourceMappingURL=note-controller-builder.js.map