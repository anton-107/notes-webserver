"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllNotesInNotebook = void 0;
const configuration_1 = require("../../configuration/configuration");
async function deleteAllNotesInNotebook(event) {
    const configuration = (0, configuration_1.notebookControllerConfiguration)({});
    configuration.logger.info("Running deleteAllNotesInNotebook for the following notebook id: ", { entityID: event.notebookID });
    return {
        notebookID: event.notebookID,
    };
}
exports.deleteAllNotesInNotebook = deleteAllNotesInNotebook;
//# sourceMappingURL=delete-all-notes-in-notebook-action.js.map