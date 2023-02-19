"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyNoNotesInNotebook = exports.VerifyNoNotesInNotebookAction = void 0;
const configuration_1 = require("../../configuration/configuration");
class VerifyNoNotesInNotebookAction {
    constructor(properties) {
        this.properties = properties;
    }
    async run(event) {
        this.properties.logger.info("Running verifyNoNotesInNotebook for the following notebook id: ", { entityID: event.notebookID, username: event.owner });
        const notes = await this.properties.noteStore.listAllInNotebook(event.owner, event.notebookID);
        if (notes.length > 0) {
            throw Error(`There are ${notes.length} notes in notebook ${event.notebookID}`);
        }
        return {
            owner: event.owner,
            notebookID: event.notebookID,
        };
    }
}
exports.VerifyNoNotesInNotebookAction = VerifyNoNotesInNotebookAction;
async function verifyNoNotesInNotebook({ Payload, }) {
    const configuration = (0, configuration_1.notebookControllerConfiguration)({});
    const action = new VerifyNoNotesInNotebookAction({
        logger: configuration.logger,
        noteStore: configuration.noteStore,
    });
    return await action.run(Payload);
}
exports.verifyNoNotesInNotebook = verifyNoNotesInNotebook;
//# sourceMappingURL=verify-no-notes-in-notebook-action.js.map