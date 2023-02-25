import { notebookControllerConfiguration } from "../../../configuration/configuration";
import { Logger } from "../../../logger/logger";
import { NoteStore } from "../../../stores/note/note-store";
import { NotebookDeletionOutput } from "./delete-all-notes-in-notebook-action";

interface VerifyNoNotesInNotebookActionProperties {
  logger: Logger;
  noteStore: NoteStore;
}

export class VerifyNoNotesInNotebookAction {
  constructor(private properties: VerifyNoNotesInNotebookActionProperties) {}
  public async run(
    event: NotebookDeletionOutput
  ): Promise<NotebookDeletionOutput> {
    this.properties.logger.info(
      "Running verifyNoNotesInNotebook for the following notebook id: ",
      { entityID: event.notebookID, username: event.owner }
    );
    const notes = await this.properties.noteStore.listAllInNotebook(
      event.owner,
      event.notebookID
    );
    if (notes.length > 0) {
      throw Error(
        `There are ${notes.length} notes in notebook ${event.notebookID}`
      );
    }
    return {
      owner: event.owner,
      notebookID: event.notebookID,
    };
  }
}

export async function verifyNoNotesInNotebook({
  Payload,
}: {
  Payload: NotebookDeletionOutput;
}): Promise<NotebookDeletionOutput> {
  const configuration = notebookControllerConfiguration({});
  const action = new VerifyNoNotesInNotebookAction({
    logger: configuration.logger,
    noteStore: configuration.noteStore,
  });
  return await action.run(Payload);
}
