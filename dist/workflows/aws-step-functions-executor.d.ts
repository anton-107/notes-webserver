import { StepFunctions } from "aws-sdk";
import { Logger } from "../logger/logger";
import { WorkflowExecutor, WorkflowName } from "./interfaces";
interface AWSStepFunctionsExecutorProperties {
    logger: Logger;
    stepFunctions: StepFunctions;
    notebookDeletionStateMachineARN: string;
}
export declare class AWSStepFunctionsExecutor implements WorkflowExecutor {
    private properties;
    constructor(properties: AWSStepFunctionsExecutorProperties);
    startExecution(workflowName: WorkflowName, executionName: string, input: string): Promise<boolean>;
}
export {};
