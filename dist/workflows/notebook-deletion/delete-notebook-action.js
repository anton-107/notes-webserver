"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotebook = exports.DeleteNotebookAction = void 0;
const configuration_1 = require("../../configuration/configuration");
class DeleteNotebookAction {
    constructor(properties) {
        this.properties = properties;
    }
    async run(event) {
        this.properties.logger.info("Running DeleteNotebookAction for the following notebook id: ", { entityID: event.notebookID, username: event.owner });
        await this.properties.notebookStore.deleteOne(event.owner, event.notebookID);
        this.properties.logger.info("Notebook deleted", {
            entityID: event.notebookID,
            username: event.owner,
        });
        return;
    }
}
exports.DeleteNotebookAction = DeleteNotebookAction;
async function deleteNotebook({ Payload, }) {
    const configuration = (0, configuration_1.notebookControllerConfiguration)({});
    const action = new DeleteNotebookAction({
        logger: configuration.logger,
        notebookStore: configuration.notebookStore,
    });
    return await action.run(Payload);
}
exports.deleteNotebook = deleteNotebook;
//# sourceMappingURL=delete-notebook-action.js.map