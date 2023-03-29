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
  catch?: string;
}
export interface Workflow {
  name: string;
  tasks: WorkflowTask[];
}
export interface WorkflowActionContext {
  input: string;
}
