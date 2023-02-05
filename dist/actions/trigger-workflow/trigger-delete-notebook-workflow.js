"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTriggerDeleteNotebookWorkflow = exports.TriggerDeleteNotebookWorkflow = void 0;
const configuration_1 = require("../../configuration/configuration");
const dynamodb_stream_source_1 = require("../dynamodb-stream-source");
class TriggerDeleteNotebookWorkflow {
    constructor(properties) {
        this.properties = properties;
    }
    async run(actionTrigger) {
        this.properties.logger.info("Invoking delete workflow for notebook", {
            entityID: actionTrigger.notebookID,
        });
        const result = await this.properties.stateMachine.startExecution("notebook-deletion", `notebook-deletion-${actionTrigger.notebookID}`, JSON.stringify({ notebookID: actionTrigger.notebookID }));
        return { isWorkflowSuccessfullyInvoked: result };
    }
}
exports.TriggerDeleteNotebookWorkflow = TriggerDeleteNotebookWorkflow;
async function runTriggerDeleteNotebookWorkflow(event) {
    const results = [];
    const configuration = (0, configuration_1.dependenciesConfiguration)({});
    for (const record of event.Records) {
        if (record.eventName !== "MODIFY") {
            configuration.logger.info("Ignoring non-MODIFY event", {
                data: record.eventName,
            });
            return;
        }
        const notebook = (0, dynamodb_stream_source_1.unmarshallRecordToNotebook)(record.dynamodb.NewImage);
        if (notebook.status === "MARKED_FOR_DELETION") {
            const action = new TriggerDeleteNotebookWorkflow({
                logger: configuration.logger,
                stateMachine: configuration.notebookDeletionStateMachine,
            });
            const result = await action.run({
                notebookID: notebook.id,
            });
            results.push(result);
        }
    }
    return results;
}
exports.runTriggerDeleteNotebookWorkflow = runTriggerDeleteNotebookWorkflow;
//# sourceMappingURL=trigger-delete-notebook-workflow.js.map