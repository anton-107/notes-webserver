import { notebookControllerConfiguration } from "../../configuration/configuration";
import { NotebookDeletionOutput } from "./delete-all-notes-in-notebook-action";

export async function verifyNoNotesInNotebook({
  Payload,
}: {
  Payload: NotebookDeletionOutput;
}): Promise<NotebookDeletionOutput> {
  const configuration = notebookControllerConfiguration({});
  configuration.logger.info(
    "Running verifyNoNotesInNotebook for the following notebook id: ",
    { entityID: Payload.notebookID }
  );
  return {
    notebookID: Payload.notebookID,
  };
}
