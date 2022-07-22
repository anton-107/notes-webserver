"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewDateRangeHandler = void 0;
const configuration_1 = require("../../../configuration/configuration");
const date_range_html_view_1 = require("../../../views/note/date-range/date-range-html-view");
const getNewDateRangeHandler = async (request) => {
    const configuration = (0, configuration_1.noteControllerConfiguration)({});
    const view = new date_range_html_view_1.DateRangeHtmlView({
        ...configuration,
        notebookID: request.pathParameters.notebookID,
    });
    return view.renderCreationFormOneEntity();
};
exports.getNewDateRangeHandler = getNewDateRangeHandler;
//# sourceMappingURL=get-new-date-range.js.map