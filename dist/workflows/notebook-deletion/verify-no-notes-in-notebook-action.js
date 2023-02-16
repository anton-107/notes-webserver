"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyNoNotesInNotebook = void 0;
const configuration_1 = require("../../configuration/configuration");
async function verifyNoNotesInNotebook({ Payload, }) {
    const configuration = (0, configuration_1.notebookControllerConfiguration)({});
    configuration.logger.info("Running verifyNoNotesInNotebook for the following notebook id: ", { entityID: Payload.notebookID });
    return {
        notebookID: Payload.notebookID,
    };
}
exports.verifyNoNotesInNotebook = verifyNoNotesInNotebook;
//# sourceMappingURL=verify-no-notes-in-notebook-action.js.map