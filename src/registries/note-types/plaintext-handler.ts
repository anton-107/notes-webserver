import { generate } from "short-uuid";
import { FormBody } from "../../http/body-parser";
import { Note, RenderedNote } from "../../model/note-model";
import { NoteTypeHandler } from "../note-types-registry";

export class PlaintextNoteHandler implements NoteTypeHandler {
  public typeName(): string {
    return "note";
  }
  public typeDisplayName(): string {
    return "plain note";
  }
  public render(note: Note): RenderedNote {
    return {
      ...note,
      renderedContent: `<div data-testid='note-content'>${note.content}</div>`,
    };
  }
  public renderEditForm(note: Note): string {
    return `<textarea name='note-content' data-testid='note-content-input'>${note.content}</textarea>`;
  }
  public mapRequestToExistingEntity(
    username: string,
    existingNote: Note,
    form: FormBody
  ): Note {
    const r = { ...existingNote };
    if ("note-content" in form) {
      r.content = form["note-content"];
    }
    if ("note-section" in form) {
      if (!r.extensionProperties) {
        r.extensionProperties = {};
      }
      r.extensionProperties.section = form["note-section"];
    }
    if ("note-manual-order" in form) {
      if (!r.extensionProperties) {
        r.extensionProperties = {};
      }
      r.extensionProperties.manualOrder = form["note-manual-order"];
    }
    return r;
  }
  public renderCreateForm(): string {
    return `<textarea name='note-content' data-testid='note-content-input'></textarea>`;
  }
  public mapRequestToNewEntity(username: string, form: FormBody): Note {
    return {
      id: generate(),
      notebookID: form["notebook-id"],
      owner: username,
      type: { type: this.typeName() },
      content: form["note-content"],
      extensionProperties: {
        section: form["note-section"],
        manualOrder: form["note-manual-order"],
      },
    };
  }
}
