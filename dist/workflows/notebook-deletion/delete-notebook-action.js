"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotebook = void 0;
const configuration_1 = require("../../configuration/configuration");
async function deleteNotebook({ Payload, }) {
    const configuration = (0, configuration_1.notebookControllerConfiguration)({});
    configuration.logger.info("Running verifyNoNotesInNotebook for the following notebook id: ", { entityID: Payload.notebookID, username: Payload.owner });
    return;
}
exports.deleteNotebook = deleteNotebook;
//# sourceMappingURL=delete-notebook-action.js.map