import { Note, RenderedNote } from "../../model/note-model";
import { NoteTypeHandler } from "../note-types-registry";

export class PlaintextHandler implements NoteTypeHandler {
  public typeName(): string {
    return "plaintext";
  }
  public typeDisplayName(): string {
    return "Plain text";
  }
  public render(note: Note): RenderedNote {
    return {
      ...note,
      renderedContent: note.content,
    };
  }
}
