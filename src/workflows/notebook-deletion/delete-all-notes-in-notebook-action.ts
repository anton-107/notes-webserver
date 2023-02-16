import { notebookControllerConfiguration } from "../../configuration/configuration";

export interface NotebookDeletionInput {
  notebookID: string;
}
export interface NotebookDeletionOutput {
  notebookID: string;
}

export async function deleteAllNotesInNotebook(
  event: NotebookDeletionInput
): Promise<NotebookDeletionOutput> {
  const configuration = notebookControllerConfiguration({});
  configuration.logger.info(
    "Running deleteAllNotesInNotebook for the following notebook id: ",
    { entityID: event.notebookID }
  );
  return {
    notebookID: event.notebookID,
  };
}
