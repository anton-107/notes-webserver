import { Logger } from "../../logger/logger";
import { WorkflowExecutor } from "../../workflows/interfaces";
import { StreamEvent } from "../dynamodb-stream-source";
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
export declare class TriggerDeleteNotebookWorkflow {
    private properties;
    constructor(properties: TriggerDeleteNotebookWorkflowProperties);
    run(actionTrigger: TriggerDeleteNotebookWorkflowAction): Promise<TriggerDeleteNotebookWorkflowActionResult>;
}
export declare function runTriggerDeleteNotebookWorkflow(event: StreamEvent): Promise<undefined | TriggerDeleteNotebookWorkflowActionResult[]>;
export {};
