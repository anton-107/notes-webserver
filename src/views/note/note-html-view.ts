import { EntityView } from "../../controller/entity-controller";
import { HttpResponse, HttpStatus } from "../../http/http";
import { Note } from "../../model/note-model";
import { HtmlViewProperties } from "../interfaces";

export interface NoteHtmlViewProperties extends HtmlViewProperties {
  notebookID?: string;
}

export class NoteHtmlView implements EntityView<Note> {
  constructor(private properties: NoteHtmlViewProperties) {}
  public renderCreationFormOneEntity(): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `
        <h1 data-testid='notebook-name'>Add new note</h1>
        <form method='post' action='${this.properties.baseUrl}/note'>
          <input type='hidden' name='notebook-id' value='${this.properties.notebookID}' />
          <textarea name='note-content' data-testid='note-content-input'></textarea>
          <button type='submit' data-testid='edit-notebook-button'>Add</button>
        </form>
        <a href='${this.properties.baseUrl}/notebook/${this.properties.notebookID}'>Cancel</a>
      `,
    };
  }
  public renderEditingFormOneEntity(note: Note): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `
        <h1>Edit note</h1>
        <form method='post' action='${this.properties.baseUrl}/note/${note.id}/edit'>
          <input type='hidden' name='note-id' value='${note.id}' />
          <input type='hidden' name='notebook-id' value='${note.notebook.id}' />
          <textarea name='note-content' data-testid='note-content-input'>${note.content}</textarea>
          <button type='submit' data-testid='edit-note-button'>Update</button>
        </form>
        <form method='post' action='${this.properties.baseUrl}/note/delete'>
          <input type='hidden' name='note-id' value='${note.id}' />
          <button type='submit' data-testid='note-delete-button'>Delete this note</button>
        </form>
        <a href='${this.properties.baseUrl}/notebook/${note.notebook.id}'>Cancel edit</a>
      `,
    };
  }
  public renderDetailsPageOneEntity(entity: Note): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `${entity.id}`,
    };
  }
  public renderMacroListOfNotes(notes: Note[]): string {
    return `
      ${notes
        .map(
          (note) => `<div>
          <div data-testid='note-content'>${note.content}</div>
          <a href='${this.properties.baseUrl}/notebook/${note.notebook.id}/note/${note.id}/edit' data-testid='note-edit-link'>Edit</a>
        </div>`
        )
        .join("")}
    `;
  }
  public renderMacroLinksToAddNotes(notebookID: string): string {
    return `
      <h2>Add a new note</h2>
      <ul>
        <li><a href='${this.properties.baseUrl}/notebook/${notebookID}/new-note' data-testid='create-new-note-link'>Add a plain note</a></li>
        <li><a href='${this.properties.baseUrl}/notebook/${notebookID}/new-note/date-range' data-testid='create-new-date-range-link'>Add a date range entry</a></li>
      </ul>
    `;
  }
}
