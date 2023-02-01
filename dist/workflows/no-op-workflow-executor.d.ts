import { WorkflowExecutor } from "./interfaces";
export declare class NoOpWorkflowExecutor implements WorkflowExecutor {
    startExecution(): Promise<boolean>;
}
