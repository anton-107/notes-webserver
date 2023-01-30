import { StepFunctions } from "aws-sdk";

import { Logger } from "../logger/logger";
import { WorkflowExecutor } from "./interfaces";

interface AWSStepFunctionsExecutorProperties {
  logger: Logger;
  stepFunctions: StepFunctions;
  stateMachineARN: string;
}

export class AWSStepFunctionsExecutor implements WorkflowExecutor {
  constructor(private properties: AWSStepFunctionsExecutorProperties) {}

  public async startExecution(
    executionName: string,
    input: string
  ): Promise<boolean> {
    await this.properties.stepFunctions
      .startExecution({
        stateMachineArn: this.properties.stateMachineARN,
        name: executionName,
        input,
      })
      .promise();
    return true;
  }
}
