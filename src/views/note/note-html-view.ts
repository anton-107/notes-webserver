import { EntityView } from "../../controller/entity-controller";
import { HttpResponse, HttpStatus } from "../../http/http";
import { Note } from "../../model/note-model";
import { HtmlViewProperties } from "../interfaces";

export interface NoteHtmlViewProperties extends HtmlViewProperties {
  notebookID?: string;
}

export class NoteHtmlView implements EntityView<Note> {
  constructor(private properties: NoteHtmlViewProperties) {}
  renderEditingFormOneEntity(note: Note): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `
        <h1>Edit note</h1>
        <form method='post' action='${this.properties.baseUrl}/notebook/${note.id}/edit'>
          <input type='hidden' name='notebook-id' value='${note.notebook.id}' />
          <textarea name='note-content' data-testid='note-content-input'>${note.content}</textarea>
          <button type='submit' data-testid='edit-note-button'>Update</button>
        </form>
        <a href='${this.properties.baseUrl}/notebook/${note.notebook.id}'>Cancel edit</a>
      `,
    };
  }
  renderCreationFormOneEntity(): HttpResponse {
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
          <button type='submit' data-testid='edit-notebook-button'>Update</button>
        </form>
        <a href='${this.properties.baseUrl}/notebook/${this.properties.notebookID}'>Cancel</a>
      `,
    };
  }
  renderDetailsPageOneEntity(entity: Note): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `${entity.id}`,
    };
  }
}
