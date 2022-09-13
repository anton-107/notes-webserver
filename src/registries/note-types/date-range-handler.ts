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
      notebookID: form["notebook-id"],
      owner: username,
      type: { type: this.typeName() },
      content: form["note-content"],
      extensionProperties: {
        dateRangeStart: form["date-range-start"],
        dateRangeEnd: form["date-range-end"],
      },
    };
  }
  public mapRequestToExistingEntity(
    username: string,
    existingNote: Note,
    form: FormBody
  ): Note {
    return {
      ...existingNote,
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
      <div><span data-testid='note-content'>${note.content}</span></div>
      <div>Date start: <span data-testid='date-range-start'>${note.extensionProperties.dateRangeStart}</span></div>
      <div>Date end: <span data-testid='date-range-end'>${note.extensionProperties.dateRangeEnd}</span></div>
    `;
  }
  public renderCreateForm(): string {
    return `
      <label>Description
        <input name='note-content' data-testid='note-content-input' />
      </label>
      <label>Date start
        <input name='date-range-start' data-testid='date-range-start-input' />
      </label>
      <label>Date end
        <input name='date-range-end' data-testid='date-range-end-input' />
      </label>
      <div>
      * - enter dates in YYYY-MM-DD format
      </div>
    `;
  }
  public renderEditForm(note: Note): string {
    return `
    <label>Description
      <input name='note-content' data-testid='note-content-input' value='${note.content}' />
    </label>
    <label>Date start
      <input name='date-range-start' data-testid='date-range-start-input' value='${note.extensionProperties.dateRangeStart}' />
    </label>
    <label>Date end
      <input name='date-range-end' data-testid='date-range-end-input' value='${note.extensionProperties.dateRangeEnd}' />
    </label>
    <div>
    * - enter dates in YYYY-MM-DD format
    </div>`;
  }
}
