import { generate } from "short-uuid";

import { FormBody } from "../../http/body-parser";
import { Note, RenderedNote } from "../../model/note-model";
import { NotebookTableColumn } from "../../model/notebook-model";
import { NoteTypeHandler } from "../note-types-registry";

export class NotesContainerHandler implements NoteTypeHandler {
  public isMatchForAutoType(): boolean {
    return false;
  }
  public typeName(): string {
    return "notes-container";
  }
  public typeDisplayName(): string {
    return "Section";
  }
  public render(note: Note): RenderedNote {
    return {
      ...note,
      renderedContent: `<div data-testid='note-section-content'>Section: ${note.content}</div>`,
    };
  }
  public renderCreateForm(): string {
    return `<input name='note-content' data-testid='note-content-input' />`;
  }
  public renderEditForm(note: Note): string {
    return `<input name='note-content' data-testid='note-content-input' value='${note.content}' />`;
  }
  public mapRequestToNewEntity(username: string, form: FormBody): Note {
    return {
      id: generate(),
      notebookID: form["notebook-id"],
      owner: username,
      type: { type: this.typeName() },
      content: form["note-content"],
    };
  }
  public mapRequestToExistingEntity(
    username: string,
    existingNote: Note,
    form: FormBody
  ): Note {
    const r = { ...existingNote };
    r.content = form["note-content"];
    return r;
  }
  public listSupportedColumns(): NotebookTableColumn[] {
    return [];
  }
}
