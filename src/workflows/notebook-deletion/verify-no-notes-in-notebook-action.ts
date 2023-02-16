import { notebookControllerConfiguration } from "../../configuration/configuration";
import { NotebookDeletionInput } from "./delete-all-notes-in-notebook-action";

export async function verifyNoNotesInNotebook(
  event: NotebookDeletionInput
): Promise<void> {
  const configuration = notebookControllerConfiguration({});
  configuration.logger.info(
    "Running verifyNoNotesInNotebook for the following notebook id: ",
    { entityID: event.notebookID }
  );
  return;
}
