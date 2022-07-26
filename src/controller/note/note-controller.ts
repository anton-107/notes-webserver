import { generate } from "short-uuid";
import { FormBody } from "../../http/body-parser";
import { Note } from "../../model/note-model";
import { NoteTypesRegistry } from "../../registries/note-types-registry";
import { NotebookStore } from "../../stores/notebook/notebook-store";
import {
  EntityController,
  EntityControllerProperties,
} from "../entity-controller";

export interface NoteControllerProperties
  extends EntityControllerProperties<Note> {
  notebookStore: NotebookStore;
  notebookID: string | null;
  noteTypesRegistry: NoteTypesRegistry;
}

export class NoteController extends EntityController<Note> {
  constructor(private noteControllerProperties: NoteControllerProperties) {
    super(noteControllerProperties);
  }
  protected getEntityName(): string {
    return "note";
  }
  protected mapRequestToEntityID(requestForm: FormBody): string {
    return requestForm["note-id"];
  }
  protected mapRequestToExistingEntity(
    username: string,
    existingNote: Note,
    form: FormBody
  ): Note {
    const noteTypeHandler =
      this.noteControllerProperties.noteTypesRegistry.getNoteTypeHandler(
        existingNote.type.type
      );
    if (noteTypeHandler) {
      return noteTypeHandler.mapRequestToExistingEntity(
        username,
        existingNote,
        form
      );
    }

    const r = { ...existingNote };
    r.content = form["note-content"];
    return r;
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
