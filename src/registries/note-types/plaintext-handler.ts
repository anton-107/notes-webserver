import { Note, RenderedNote } from "notes-model/dist/note-model";
import {
  NotebookColumnValueType,
  NotebookTableColumn,
} from "notes-model/dist/notebook-model";
import { generate } from "short-uuid";

import { FormBody } from "../../http/body-parser";
import { NoteTypeHandler } from "../note-types-registry";
import { NotebookTableColumnsRegistry } from "../notebook-table-columns-registry";

interface PlaintextNoteHandlerProperties {
  notebookTableColumnsRegistry: NotebookTableColumnsRegistry;
}

export class PlaintextNoteHandler implements NoteTypeHandler {
  constructor(private properties: PlaintextNoteHandlerProperties) {}
  public typeName(): string {
    return "note";
  }
  public typeDisplayName(): string {
    return "plain note";
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public isMatchForAutoType(content: string): boolean {
    return false;
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
      r.extensionProperties.manualOrder = Number(form["note-manual-order"]);
    }
    if ("table-columns" in form) {
      if (!r.columnValues) {
        r.columnValues = {};
      }
      const supportedColumns =
        this.properties.notebookTableColumnsRegistry.listColumns();
      const requestedColumns: { [key: string]: string } = form[
        "table-columns"
      ] as unknown as { [key: string]: string };
      supportedColumns.forEach((c) => {
        if (requestedColumns[c.columnType]) {
          r.columnValues[c.columnType] = requestedColumns[
            c.columnType
          ] as NotebookColumnValueType;
        }
      });
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
        manualOrder: Number(form["note-manual-order"]),
      },
    };
  }
  public listSupportedColumns(): NotebookTableColumn[] {
    return [];
  }
}
