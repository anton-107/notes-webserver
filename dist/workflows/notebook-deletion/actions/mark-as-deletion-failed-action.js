"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsDeletionFailed = exports.MarkAsDeletionFailedAction = void 0;
const configuration_1 = require("../../../configuration/configuration");
class MarkAsDeletionFailedAction {
    constructor(properties) {
        this.properties = properties;
    }
    async run(event) {
        this.properties.logger.info("Running MarkAsDeletionFailedAction for the following notebook id: ", { entityID: event.notebookID, username: event.owner, data: event });
        const notebook = await this.properties.notebookStore.getOne(event.owner, event.notebookID);
        if (!notebook) {
            throw Error("Notebook is not found");
        }
        notebook.status = "DELETION_FAILED";
        await this.properties.notebookStore.editOne(notebook);
        this.properties.logger.info("Notebook marked as deletion failed", {
            entityID: event.notebookID,
            username: event.owner,
        });
        return;
    }
}
exports.MarkAsDeletionFailedAction = MarkAsDeletionFailedAction;
async function markAsDeletionFailed({ Payload, }) {
    const configuration = (0, configuration_1.notebookControllerConfiguration)({});
    const action = new MarkAsDeletionFailedAction({
        logger: configuration.logger,
        notebookStore: configuration.notebookStore,
    });
    return await action.run(Payload);
}
exports.markAsDeletionFailed = markAsDeletionFailed;
//# sourceMappingURL=mark-as-deletion-failed-action.js.map