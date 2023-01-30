export interface WorkflowExecutor {
  startExecution(executionName: string, input: string): Promise<boolean>;
}
