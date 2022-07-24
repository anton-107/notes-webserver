import { Note, RenderedNote } from "../model/note-model";

export interface NoteTypeHandler {
  typeName(): string;
  typeDisplayName(): string;
  render(note: Note): RenderedNote;
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
}
