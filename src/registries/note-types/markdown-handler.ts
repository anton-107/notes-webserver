import { Note, RenderedNote } from "../../model/note-model";
import { NoteTypeHandler } from "../note-types-registry";

export class MarkdownHandler implements NoteTypeHandler {
  public typeName(): string {
    return "markdown";
  }
  public typeDisplayName(): string {
    return "Markdown formatting";
  }
  public render(note: Note): RenderedNote {
    return {
      ...note,
      renderedContent: note.content,
    };
  }
}
