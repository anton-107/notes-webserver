import { StepFunctions } from "aws-sdk";
import { Logger } from "../logger/logger";
import { WorkflowExecutor } from "./interfaces";
interface AWSStepFunctionsExecutorProperties {
    logger: Logger;
    stepFunctions: StepFunctions;
    stateMachineARN: string;
}
export declare class AWSStepFunctionsExecutor implements WorkflowExecutor {
    private properties;
    constructor(properties: AWSStepFunctionsExecutorProperties);
    startExecution(executionName: string, input: string): Promise<boolean>;
}
export {};
