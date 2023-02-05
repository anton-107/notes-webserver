import { dependenciesConfiguration } from "../../configuration/configuration";
import { Logger } from "../../logger/logger";
import { WorkflowExecutor } from "../../workflows/interfaces";
import {
  StreamEvent,
  unmarshallRecordToNotebook,
} from "../dynamodb-stream-source";

interface TriggerDeleteNotebookWorkflowAction {
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
    const result = await this.properties.stateMachine.startExecution(
      "notebook-deletion",
      `notebook-deletion-${actionTrigger.notebookID}`,
      JSON.stringify({ notebookID: actionTrigger.notebookID })
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
        notebookID: notebook.id,
      });
      results.push(result);
    }
  }

  return results;
}
