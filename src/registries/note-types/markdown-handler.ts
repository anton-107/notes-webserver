import { Note, RenderedNote } from "../../model/note-model";
import { NoteTypeHandler } from "../note-types-registry";

export class MarkdownHandler implements NoteTypeHandler {
  public typeName(): string {
    return "markdown";
  }
  public typeDisplayName(): string {
    return "markdown formatted note";
  }
  public render(note: Note): RenderedNote {
    return {
      ...note,
      renderedContent: note.content,
    };
  }
  public renderEditForm(note: Note): string {
    return `<textarea name='note-content' data-testid='note-content-input'>${note.content}</textarea>`;
  }
}
