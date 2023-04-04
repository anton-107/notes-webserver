import { Note } from "notes-model/dist/note-model";

import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse, HttpStatus } from "../../http/http";
import {
  NoteTypeHandler,
  NoteTypesRegistry,
} from "../../registries/note-types-registry";
import { EntityView } from "../entity-view";
import { HtmlViewProperties } from "../interfaces";

export interface NoteHtmlViewProperties extends HtmlViewProperties {
  notebookID?: string;
  noteTypesRegistry: NoteTypesRegistry;
  corsHeaders: CORSHeaders;
}

export class NoteHtmlView implements EntityView<Note> {
  constructor(protected properties: NoteHtmlViewProperties) {}
  public renderCreationFormOneEntity(partialNote: Partial<Note>): HttpResponse {
    const noteType = partialNote.type ? partialNote.type.type : null;
    const noteTypeHandler =
      this.properties.noteTypesRegistry.getNoteTypeHandler(noteType);

    let formContents = `<textarea name='note-content' data-testid='note-content-input'></textarea>`;
    let noteTypeHiddenField = "";
    if (noteTypeHandler) {
      noteTypeHiddenField = `<input type='hidden' name='note-type' value='${noteType}' />`;
      formContents = noteTypeHandler.renderCreateForm();
    }

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
          ${noteTypeHiddenField}
          ${formContents}
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
          <input type='hidden' name='notebook-id' value='${note.notebookID}' />
          ${formContents}
          <button type='submit' data-testid='edit-note-button'>Update</button>
        </form>
        <form method='post' action='${this.properties.baseUrl}/note/delete'>
          <input type='hidden' name='note-id' value='${note.id}' />
          <button type='submit' data-testid='note-delete-button'>Delete this note</button>
        </form>
        <a href='${this.properties.baseUrl}/notebook/${note.notebookID}'>Cancel edit</a>
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
            note.notebookID
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
            }/notebook/${notebookID}/new-note/${noteType.typeName()}' data-testid='create-new-${noteType.typeName()}-link'>Add a ${noteType.typeDisplayName()}</a></li>
          </div>`
          )
          .join("")}
      </ul>
    `;
  }
  public renderListPageAllEntities(entities: Note[]): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...this.properties.corsHeaders, // TODO: move this to a json view
      },
      body: JSON.stringify({
        notes: entities,
      }),
    };
  }
  private renderNote(note: Note): string {
    const handler = this.properties.noteTypesRegistry.getNoteTypeHandler(
      note.type.type
    );
    return handler.render(note).renderedContent;
  }
}
