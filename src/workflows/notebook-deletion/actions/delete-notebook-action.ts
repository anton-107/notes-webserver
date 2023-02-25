import { notebookControllerConfiguration } from "../../../configuration/configuration";
import { Logger } from "../../../logger/logger";
import { NotebookStore } from "../../../stores/notebook/notebook-store";
import { NotebookDeletionOutput } from "./delete-all-notes-in-notebook-action";

interface DeleteNotebookActionProperties {
  logger: Logger;
  notebookStore: NotebookStore;
}

export class DeleteNotebookAction {
  constructor(private properties: DeleteNotebookActionProperties) {}
  public async run(event: NotebookDeletionOutput): Promise<void> {
    this.properties.logger.info(
      "Running DeleteNotebookAction for the following notebook id: ",
      { entityID: event.notebookID, username: event.owner }
    );
    await this.properties.notebookStore.deleteOne(
      event.owner,
      event.notebookID
    );
    this.properties.logger.info("Notebook deleted", {
      entityID: event.notebookID,
      username: event.owner,
    });
    return;
  }
}

export async function deleteNotebook({
  Payload,
}: {
  Payload: NotebookDeletionOutput;
}): Promise<void> {
  const configuration = notebookControllerConfiguration({});
  const action = new DeleteNotebookAction({
    logger: configuration.logger,
    notebookStore: configuration.notebookStore,
  });
  return await action.run(Payload);
}
