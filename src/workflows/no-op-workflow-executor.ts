import { WorkflowExecutor } from "./interfaces";

export class NoOpWorkflowExecutor implements WorkflowExecutor {
  public async startExecution(): Promise<boolean> {
    return true;
  }
}
