import { FormBody } from "../http/body-parser";
import { Note, RenderedNote } from "../model/note-model";

export interface NoteTypeHandler {
  typeName(): string;
  typeDisplayName(): string;
  render(note: Note): RenderedNote;
  renderCreateForm(): string;
  renderEditForm(note: Note): string;
  mapRequestToNewEntity(username: string, form: FormBody): Note;
  mapRequestToExistingEntity(
    username: string,
    existingNote: Note,
    form: FormBody
  ): Note;
  isMatchForAutoType(content: string): boolean;
}

export class NoteTypesRegistry {
  private handlers: NoteTypeHandler[] = [];

  public addNoteTypeHandler(handler: NoteTypeHandler) {
    this.handlers.push(handler);
  }
  public listNoteTypeHandlers(): NoteTypeHandler[] {
    return this.handlers;
  }
  public getNoteTypeHandler(noteTypeName: string): NoteTypeHandler | null {
    return this.handlers.find((x) => x.typeName() === noteTypeName);
  }
  public getAutoType(content: string): string | null {
    const handler = this.handlers.find((x) => x.isMatchForAutoType(content));
    if (!handler) {
      return null;
    }
    return handler.typeName();
  }
}
