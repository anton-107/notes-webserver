"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllNotesInNotebook = exports.DeleteAllNotesInNotebookAction = void 0;
const configuration_1 = require("../../../configuration/configuration");
class DeleteAllNotesInNotebookAction {
    constructor(properties) {
        this.properties = properties;
    }
    async run(event) {
        this.properties.logger.info("Running deleteAllNotesInNotebook for the following notebook id: ", { entityID: event.notebookID });
        await this.properties.noteStore.deleteAllInNotebook(event.owner, event.notebookID);
        return {
            owner: event.owner,
            notebookID: event.notebookID,
        };
    }
}
exports.DeleteAllNotesInNotebookAction = DeleteAllNotesInNotebookAction;
async function deleteAllNotesInNotebook(event) {
    const configuration = (0, configuration_1.notebookControllerConfiguration)({});
    const action = new DeleteAllNotesInNotebookAction({
        logger: configuration.logger,
        noteStore: configuration.noteStore,
    });
    return await action.run(event);
}
exports.deleteAllNotesInNotebook = deleteAllNotesInNotebook;
//# sourceMappingURL=delete-all-notes-in-notebook-action.js.map