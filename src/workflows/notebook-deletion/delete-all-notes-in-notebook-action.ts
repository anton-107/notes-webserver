import { notebookControllerConfiguration } from "../../configuration/configuration";

export interface NotebookDeletionInput {
  notebookID: string;
}

export async function deleteAllNotesInNotebook(
  event: NotebookDeletionInput
): Promise<void> {
  const configuration = notebookControllerConfiguration({});
  configuration.logger.info(
    "Running deleteAllNotesInNotebook for the following notebook id: ",
    { entityID: event.notebookID }
  );
  return;
}
