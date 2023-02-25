import { notebookControllerConfiguration } from "../../../configuration/configuration";
import { Logger } from "../../../logger/logger";
import { NoteStore } from "../../../stores/note/note-store";

export interface NotebookDeletionInput {
  owner: string;
  notebookID: string;
}
export interface NotebookDeletionOutput {
  owner: string;
  notebookID: string;
}

interface DeleteAllNotesInNotebookActionProperties {
  logger: Logger;
  noteStore: NoteStore;
}

export class DeleteAllNotesInNotebookAction {
  constructor(private properties: DeleteAllNotesInNotebookActionProperties) {}
  public async run(
    event: NotebookDeletionInput
  ): Promise<NotebookDeletionOutput> {
    this.properties.logger.info(
      "Running deleteAllNotesInNotebook for the following notebook id: ",
      { entityID: event.notebookID }
    );

    await this.properties.noteStore.deleteAllInNotebook(
      event.owner,
      event.notebookID
    );

    return {
      owner: event.owner,
      notebookID: event.notebookID,
    };
  }
}

export async function deleteAllNotesInNotebook(
  event: NotebookDeletionInput
): Promise<NotebookDeletionOutput> {
  const configuration = notebookControllerConfiguration({});
  const action = new DeleteAllNotesInNotebookAction({
    logger: configuration.logger,
    noteStore: configuration.noteStore,
  });
  return await action.run(event);
}
