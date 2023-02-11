import { StepFunctions } from "aws-sdk";
import { Logger } from "../logger/logger";
import { AWSStepFunctionsExecutor } from "../workflows/aws-step-functions-executor";
import { ServiceConfigurationOverrides } from "./interfaces";

export const notebookDeletionStateMachineConfiguration = (
  logger: Logger,
  notebookDeletionStateMachineARN: string,
): ServiceConfigurationOverrides => {
  const r: ServiceConfigurationOverrides = {};
  r.notebookDeletionStateMachine = new AWSStepFunctionsExecutor({
    logger,
    stepFunctions: new StepFunctions(),
    notebookDeletionStateMachineARN
  });
  return r;
};