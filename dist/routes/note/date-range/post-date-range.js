"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDateRangeHandler = void 0;
const configuration_1 = require("../../../configuration/configuration");
const date_range_controller_1 = require("../../../controller/note/date-range/date-range-controller");
const body_parser_1 = require("../../../http/body-parser");
const cookie_parser_1 = require("../../../http/cookie-parser");
const note_html_view_1 = require("../../../views/note/note-html-view");
const postDateRangeHandler = async (request) => {
    const configuration = (0, configuration_1.noteControllerConfiguration)({});
    const requestBody = (0, body_parser_1.parseBody)(request);
    return await new date_range_controller_1.DateRangeController({
        ...configuration,
        entityView: new note_html_view_1.NoteHtmlView({ ...configuration }),
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        notebookID: null,
    }).performCreateSingleEntityAction(requestBody);
};
exports.postDateRangeHandler = postDateRangeHandler;
//# sourceMappingURL=post-date-range.js.map