import { notebookControllerConfiguration } from "../../../configuration/configuration";
import { Logger } from "../../../logger/logger";
import { NotebookStore } from "../../../stores/notebook/notebook-store";
import { NotebookDeletionOutput } from "./delete-all-notes-in-notebook-action";

interface MarkAsDeletionFailedActionProperties {
  logger: Logger;
  notebookStore: NotebookStore;
}

export class MarkAsDeletionFailedAction {
  constructor(private properties: MarkAsDeletionFailedActionProperties) {}
  public async run(event: NotebookDeletionOutput): Promise<void> {
    this.properties.logger.info(
      "Running MarkAsDeletionFailedAction for the following notebook id: ",
      { entityID: event.notebookID, username: event.owner, data: event }
    );
    const notebook = await this.properties.notebookStore.getOne(
      event.owner,
      event.notebookID
    );

    if (!notebook) {
      throw Error('Notebook is not found');
    }

    notebook.status = "DELETION_FAILED";

    await this.properties.notebookStore.editOne(notebook);

    this.properties.logger.info("Notebook marked as deletion failed", {
      entityID: event.notebookID,
      username: event.owner,
    });
    return;
  }
}

export async function markAsDeletionFailed({
  Payload,
}: {
  Payload: NotebookDeletionOutput;
}): Promise<void> {
  const configuration = notebookControllerConfiguration({});
  const action = new MarkAsDeletionFailedAction({
    logger: configuration.logger,
    notebookStore: configuration.notebookStore,
  });
  return await action.run(Payload);
}
