import { generate } from "short-uuid";
import { FormBody } from "../../http/body-parser";
import { HttpResponse } from "../../http/http";
import { Note } from "../../model/note-model";
import { NoteTypesRegistry } from "../../registries/note-types-registry";
import { NoteStore } from "../../stores/note/note-store";
import { NotebookStore } from "../../stores/notebook/notebook-store";
import {
  EntityController,
  EntityControllerProperties,
} from "../entity-controller";

export interface NoteControllerProperties
  extends EntityControllerProperties<Note> {
  noteStore: NoteStore;
  notebookStore: NotebookStore;
  notebookID: string | null;
  noteTypesRegistry: NoteTypesRegistry;
  noteType: string;
}

export class NoteController extends EntityController<Note> {
  constructor(private noteControllerProperties: NoteControllerProperties) {
    super(noteControllerProperties);
  }
  public async showCreateNewEntityPage(): Promise<HttpResponse> {
    const user = await this.noteControllerProperties.authenticator.authenticate(
      this.noteControllerProperties.authenticationToken
    );
    const createNewEntityResponse =
      this.noteControllerProperties.entityView.renderCreationFormOneEntity({
        type: { type: this.noteControllerProperties.noteType },
      });
    return await this.noteControllerProperties.postProcessorRegistry.processResponse(
      user.username,
      createNewEntityResponse
    );
  }
  public async showNotesInNotebook(notebookID: string): Promise<HttpResponse> {
    const user = await this.noteControllerProperties.authenticator.authenticate(
      this.noteControllerProperties.authenticationToken
    );
    const notes =
      await this.noteControllerProperties.noteStore.listAllInNotebook(
        user.username,
        notebookID
      );
    return this.noteControllerProperties.entityView.renderListPageAllEntities(
      notes
    );
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
    return noteTypeHandler.mapRequestToExistingEntity(
      username,
      existingNote,
      form
    );
  }
  protected mapRequestToNewEntity(username: string, form: FormBody): Note {
    const noteType = form["note-type"];
    const noteTypeHandler =
      this.noteControllerProperties.noteTypesRegistry.getNoteTypeHandler(
        noteType
      );
    if (noteTypeHandler) {
      return noteTypeHandler.mapRequestToNewEntity(username, form);
    }
    return {
      id: generate(),
      notebookID: form["notebook-id"],
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
      entity.notebookID
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
    return `/notebook/${note.notebookID}`;
  }
}
