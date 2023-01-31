import { StepFunctions } from "aws-sdk";
import { anything, instance, mock, verify, when } from "ts-mockito";

import { LoggerBunyan } from "../../src/logger/logger-bunyan";
import { AWSStepFunctionsExecutor } from "./../../src/workflows/aws-step-functions-executor";

const logger = new LoggerBunyan();

describe("AWSStepFunctionsExecutor", () => {
  it("should start an execution", async () => {
    const stepFunctions = mock<StepFunctions>();
    when(stepFunctions.startExecution(anything())).thenReturn(mock());
    const executor = new AWSStepFunctionsExecutor({
      logger,
      stepFunctions: instance(stepFunctions),
      stateMachineARN: "deletion-workflow",
    });
    await executor.startExecution(
      "delete-notebook--notebook1",
      JSON.stringify({ notebookID: "notebook-1" })
    );
    verify(stepFunctions.startExecution(anything())).called();
  });
});
