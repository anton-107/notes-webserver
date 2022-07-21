import { Note, RenderedNote } from "../../model/note-model";
import { NoteTypeHandler } from "../note-types-registry";

export class DateRangeNoteHandler implements NoteTypeHandler {
  public typeName(): string {
    return "date-range";
  }
  public typeDisplayName(): string {
    return "date range entry";
  }
  public render(note: Note): RenderedNote {
    return {
      ...note,
      renderedContent: note.content,
    };
  }
}
