import { StepFunctions } from "aws-sdk";
import { anything, instance, mock, verify, when } from "ts-mockito";

import { LoggerBunyan } from "../../src/logger/logger-bunyan";
import { AWSStepFunctionsExecutor } from "./../../src/workflows/aws-step-functions-executor";

const logger = new LoggerBunyan();

describe("AWSStepFunctionsExecutor", () => {
  it("should start an execution of a notebook deletion", async () => {
    const stepFunctions = mock<StepFunctions>();
    when(stepFunctions.startExecution(anything())).thenReturn(mock());
    const executor = new AWSStepFunctionsExecutor({
      logger,
      stepFunctions: instance(stepFunctions),
      notebookDeletionStateMachineARN: "deletion-workflow",
    });
    await executor.startExecution(
      "notebook-deletion",
      "delete-notebook--notebook1",
      JSON.stringify({ notebookID: "notebook-1" })
    );
    verify(stepFunctions.startExecution(anything())).called();
  });
});
