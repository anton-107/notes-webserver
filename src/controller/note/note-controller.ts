import {
  EntityController,
  EntityControllerProperties,
} from "../entity-controller";
import { Note } from "../../model/note-model";
import { FormBody } from "../../http/body-parser";
import { generate } from "short-uuid";
import { NotebookStore } from "../../stores/notebook/notebook-store";

export interface NoteControllerProperties
  extends EntityControllerProperties<Note> {
  notebookStore: NotebookStore;
}

export class NoteController extends EntityController<Note> {
  constructor(private noteControllerProperties: NoteControllerProperties) {
    super(noteControllerProperties);
  }
  protected getEntityName(): string {
    return "note";
  }
  protected mapRequestToExistingEntity(username: string, form: FormBody): Note {
    return {
      id: form["note-id"],
      notebook: { id: form["notebook-id"], name: "", owner: "" },
      owner: username,
      type: { type: "" },
      content: form["note-content"],
    };
  }
  protected mapRequestToNewEntity(username: string, form: FormBody): Note {
    return {
      id: generate(),
      notebook: { id: form["notebook-id"], name: "", owner: "" },
      owner: username,
      type: { type: "" },
      content: form["note-content"],
    };
  }
  protected async isAuthorizedToCreate(
    user: string,
    entity: Note
  ): Promise<boolean> {
    const notebook = await this.noteControllerProperties.notebookStore.getOne(
      user,
      entity.notebook.id
    );
    if (!notebook) {
      console.log(
        "[isAuthorizedToCreate] notebook not found. Access denied",
        notebook
      );
      return false;
    }
    // if notebook is found, it means that user owns that notebook
    console.log(
      "[isAuthorizedToCreate] notebook found. Access granted",
      notebook
    );
    return true;
  }
  protected getEntityURL(note: Note): string {
    return `/notebook/${note.notebook.id}`;
  }
}
