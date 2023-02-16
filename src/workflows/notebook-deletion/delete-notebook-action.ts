import { notebookControllerConfiguration } from "../../configuration/configuration";
import { NotebookDeletionOutput } from "./delete-all-notes-in-notebook-action";

export async function deleteNotebook({
  Payload,
}: {
  Payload: NotebookDeletionOutput;
}): Promise<void> {
  const configuration = notebookControllerConfiguration({});
  configuration.logger.info(
    "Running verifyNoNotesInNotebook for the following notebook id: ",
    { entityID: Payload.notebookID }
  );
  return;
}
