import { dependenciesConfiguration } from "../../configuration/configuration";
import { Logger } from "../../logger/logger";
import { WorkflowExecutor } from "../../workflows/interfaces";
import { NotebookDeletionInput } from "../../workflows/notebook-deletion/delete-all-notes-in-notebook-action";
import {
  StreamEvent,
  unmarshallRecordToNotebook,
} from "../dynamodb-stream-source";

interface TriggerDeleteNotebookWorkflowAction {
  owner: string;
  notebookID: string;
}
interface TriggerDeleteNotebookWorkflowActionResult {
  isWorkflowSuccessfullyInvoked: boolean;
}
interface TriggerDeleteNotebookWorkflowProperties {
  logger: Logger;
  stateMachine: WorkflowExecutor;
}

export class TriggerDeleteNotebookWorkflow {
  constructor(private properties: TriggerDeleteNotebookWorkflowProperties) {}
  public async run(
    actionTrigger: TriggerDeleteNotebookWorkflowAction
  ): Promise<TriggerDeleteNotebookWorkflowActionResult> {
    this.properties.logger.info("Invoking delete workflow for notebook", {
      entityID: actionTrigger.notebookID,
    });
    const input: NotebookDeletionInput = {
      owner: actionTrigger.owner,
      notebookID: actionTrigger.notebookID,
    };
    const result = await this.properties.stateMachine.startExecution(
      "notebook-deletion",
      `notebook-deletion-${actionTrigger.notebookID}-${Date.now()}`,
      JSON.stringify(input)
    );
    return { isWorkflowSuccessfullyInvoked: result };
  }
}

export async function runTriggerDeleteNotebookWorkflow(
  event: StreamEvent
): Promise<undefined | TriggerDeleteNotebookWorkflowActionResult[]> {
  const results: TriggerDeleteNotebookWorkflowActionResult[] = [];
  const configuration = dependenciesConfiguration({});
  for (const record of event.Records) {
    if (record.eventName !== "MODIFY") {
      configuration.logger.info("Ignoring non-MODIFY event", {
        data: record.eventName,
      });
      return;
    }
    const notebook = unmarshallRecordToNotebook(record.dynamodb.NewImage);
    if (notebook.status === "MARKED_FOR_DELETION") {
      const action = new TriggerDeleteNotebookWorkflow({
        logger: configuration.logger,
        stateMachine: configuration.notebookDeletionStateMachine,
      });
      const result = await action.run({
        owner: notebook.owner,
        notebookID: notebook.id,
      });
      results.push(result);
    }
  }

  return results;
}
