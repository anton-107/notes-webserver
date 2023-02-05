import { Action } from "../actions/interfaces";

export type WorkflowName = "notebook-deletion";

export interface WorkflowExecutor {
  startExecution(
    workflowName: WorkflowName,
    executionName: string,
    input: string
  ): Promise<boolean>;
}
export interface WorkflowTask {
  type: string;
  action: Action | undefined;
}
export interface Workflow {
  name: string;
  tasks: WorkflowTask[];
}
