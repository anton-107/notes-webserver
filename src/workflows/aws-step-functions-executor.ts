import { StepFunctions } from "aws-sdk";

import { Logger } from "../logger/logger";
import { WorkflowExecutor, WorkflowName } from "./interfaces";

interface AWSStepFunctionsExecutorProperties {
  logger: Logger;
  stepFunctions: StepFunctions;
  notebookDeletionStateMachineARN: string;
}

export class AWSStepFunctionsExecutor implements WorkflowExecutor {
  constructor(private properties: AWSStepFunctionsExecutorProperties) {}

  public async startExecution(
    workflowName: WorkflowName,
    executionName: string,
    input: string
  ): Promise<boolean> {
    let stateMachineArn = undefined;

    switch (workflowName) {
      case "notebook-deletion":
        stateMachineArn = this.properties.notebookDeletionStateMachineARN;
        break;
    }

    await this.properties.stepFunctions
      .startExecution({
        stateMachineArn,
        name: executionName,
        input,
      })
      .promise();
    return true;
  }
}
