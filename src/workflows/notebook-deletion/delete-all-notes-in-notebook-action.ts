import { notebookControllerConfiguration } from "../../configuration/configuration";
import { WorkflowActionContext } from "../interfaces";

export async function deleteAllNotesInNotebook(
  event: WorkflowActionContext
): Promise<void> {
  const configuration = notebookControllerConfiguration({});
  configuration.logger.info(
    "Running deleteAllNotesInNotebook with the following input: ",
    { data: event.input }
  );
  return;
}
