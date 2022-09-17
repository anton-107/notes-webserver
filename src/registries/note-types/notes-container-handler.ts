import { generate } from "short-uuid";
import { FormBody } from "../../http/body-parser";
import { Note, RenderedNote } from "../../model/note-model";
import { NoteTypeHandler } from "../note-types-registry";

export class NotesContainerHandler implements NoteTypeHandler {
  typeName(): string {
    return "notes-container";
  }
  typeDisplayName(): string {
    return "Section";
  }
  render(note: Note): RenderedNote {
    return {
      ...note,
      renderedContent: `<div data-testid='note-section-content'>Section: ${note.content}</div>`,
    };
  }
  renderCreateForm(): string {
    return `<input name='note-content' data-testid='note-content-input' />`;
  }
  renderEditForm(note: Note): string {
    return `<input name='note-content' data-testid='note-content-input' value='${note.content}' />`;
  }
  mapRequestToNewEntity(username: string, form: FormBody): Note {
    return {
      id: generate(),
      notebookID: form["notebook-id"],
      owner: username,
      type: { type: this.typeName() },
      content: form["note-content"],
    };
  }
  mapRequestToExistingEntity(
    username: string,
    existingNote: Note,
    form: FormBody
  ): Note {
    const r = { ...existingNote };
    r.content = form["note-content"];
    return r;
  }
}
