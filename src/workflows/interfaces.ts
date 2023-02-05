export type WorkflowName = "notebook-deletion";

export interface WorkflowExecutor {
  startExecution(
    workflowName: WorkflowName,
    executionName: string,
    input: string
  ): Promise<boolean>;
}
