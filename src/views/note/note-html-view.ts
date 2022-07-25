import { EntityView } from "../../controller/entity-controller";
import { HttpResponse, HttpStatus } from "../../http/http";
import { Note } from "../../model/note-model";
import {
  NoteTypeHandler,
  NoteTypesRegistry,
} from "../../registries/note-types-registry";
import { HtmlViewProperties } from "../interfaces";

export interface NoteHtmlViewProperties extends HtmlViewProperties {
  notebookID?: string;
  noteTypesRegistry: NoteTypesRegistry;
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
    const noteTypeHandler =
      this.properties.noteTypesRegistry.getNoteTypeHandler(note.type.type);
    let formContents = `<textarea name='note-content' data-testid='note-content-input'>${note.content}</textarea>`;
    if (noteTypeHandler) {
      formContents = noteTypeHandler.renderEditForm(note);
    }
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
          ${formContents}
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
          (note) => `<div class ='note'>
            <div>${this.renderNote(note)}</div>
            <div><a href='${this.properties.baseUrl}/notebook/${
            note.notebook.id
          }/note/${note.id}/edit' data-testid='note-edit-link'>Edit</a></div>
          </div>`
        )
        .join("")}
    `;
  }
  public renderMacroLinksToAddNotes(
    notebookID: string,
    noteTypes: NoteTypeHandler[]
  ): string {
    return `
      <h2>Add a new note</h2>
      <ul>
        ${noteTypes
          .map(
            (noteType) => `<div>
            <li><a href='${
              this.properties.baseUrl
            }/notebook/${notebookID}/new-${noteType.typeName()}' data-testid='create-new-${noteType.typeName()}-link'>Add a ${noteType.typeDisplayName()}</a></li>
          </div>`
          )
          .join("")}
      </ul>
    `;
  }
  private renderNote(note: Note): string {
    const handler = this.properties.noteTypesRegistry.getNoteTypeHandler(
      note.type.type
    );
    if (!handler) {
      return this.renderSimpleNote(note);
    }
    return handler.render(note).renderedContent;
  }
  private renderSimpleNote(note: Note): string {
    return `<div data-testid='note-content'>${note.content}</div>`;
  }
}
