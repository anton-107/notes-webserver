"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyNoNotesInNotebook = void 0;
const configuration_1 = require("../../configuration/configuration");
async function verifyNoNotesInNotebook(event) {
    const configuration = (0, configuration_1.notebookControllerConfiguration)({});
    configuration.logger.info("Running verifyNoNotesInNotebook for the following notebook id: ", { entityID: event.notebookID });
    return;
}
exports.verifyNoNotesInNotebook = verifyNoNotesInNotebook;
//# sourceMappingURL=verify-no-notes-in-notebook-action.js.map