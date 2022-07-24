import { generate } from "short-uuid";
import { FormBody } from "../../http/body-parser";
import { Note, RenderedNote } from "../../model/note-model";
import { NoteTypeHandler } from "../note-types-registry";

export class DateRangeNoteHandler implements NoteTypeHandler {
  public typeName(): string {
    return "date-range";
  }
  public typeDisplayName(): string {
    return "date range entry";
  }
  public mapRequestToNewEntity(username: string, form: FormBody): Note {
    return {
      id: generate(),
      notebook: { id: form["notebook-id"], name: "", owner: "" },
      owner: username,
      type: { type: this.typeName() },
      content: form["note-content"],
      extensionProperties: {
        dateRangeStart: form["date-range-start"],
        dateRangeEnd: form["date-range-end"],
      },
    };
  }
  public render(note: Note): RenderedNote {
    return {
      ...note,
      renderedContent: this.htmlView(note),
    };
  }
  private htmlView(note: Note): string {
    return `
      <div>Date start: <span data-testid='date-range-start'>${note.extensionProperties.dateRangeStart}</span></div>
      <div>Date start: <span data-testid='date-range-end'>${note.extensionProperties.dateRangeEnd}</span></div>
    `;
  }
}
