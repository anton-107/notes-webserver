import { Logger } from "../../logger/logger";
import { StreamEvent } from "../dynamodb-stream-source";
interface TriggerDeleteNotebookWorkflowAction {
    notebookID: string;
}
interface TriggerDeleteNotebookWorkflowActionResult {
    isWorkflowSuccessfullyInvoked: boolean;
}
interface TriggerDeleteNotebookWorkflowProperties {
    logger: Logger;
}
export declare class TriggerDeleteNotebookWorkflow {
    private properties;
    constructor(properties: TriggerDeleteNotebookWorkflowProperties);
    run(actionTrigger: TriggerDeleteNotebookWorkflowAction): Promise<TriggerDeleteNotebookWorkflowActionResult>;
}
export declare function runTriggerDeleteNotebookWorkflow(event: StreamEvent): Promise<undefined | TriggerDeleteNotebookWorkflowActionResult[]>;
export {};
