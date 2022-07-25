"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteHtmlView = void 0;
const http_1 = require("../../http/http");
class NoteHtmlView {
    constructor(properties) {
        this.properties = properties;
    }
    renderCreationFormOneEntity() {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
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
    renderEditingFormOneEntity(note) {
        const noteTypeHandler = this.properties.noteTypesRegistry.getNoteTypeHandler(note.type.type);
        let formContents = `<textarea name='note-content' data-testid='note-content-input'>${note.content}</textarea>`;
        if (noteTypeHandler) {
            formContents = noteTypeHandler.renderEditForm(note);
        }
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
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
    renderDetailsPageOneEntity(entity) {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
            body: `${entity.id}`,
        };
    }
    renderMacroListOfNotes(notes) {
        return `
      ${notes
            .map((note) => `<div class ='note'>
            <div>${this.renderNote(note)}</div>
            <div><a href='${this.properties.baseUrl}/notebook/${note.notebook.id}/note/${note.id}/edit' data-testid='note-edit-link'>Edit</a></div>
          </div>`)
            .join("")}
    `;
    }
    renderMacroLinksToAddNotes(notebookID, noteTypes) {
        return `
      <h2>Add a new note</h2>
      <ul>
        ${noteTypes
            .map((noteType) => `<div>
            <li><a href='${this.properties.baseUrl}/notebook/${notebookID}/new-${noteType.typeName()}' data-testid='create-new-${noteType.typeName()}-link'>Add a ${noteType.typeDisplayName()}</a></li>
          </div>`)
            .join("")}
      </ul>
    `;
    }
    renderNote(note) {
        const handler = this.properties.noteTypesRegistry.getNoteTypeHandler(note.type.type);
        if (!handler) {
            return this.renderSimpleNote(note);
        }
        return handler.render(note).renderedContent;
    }
    renderSimpleNote(note) {
        return `<div data-testid='note-content'>${note.content}</div>`;
    }
}
exports.NoteHtmlView = NoteHtmlView;
//# sourceMappingURL=note-html-view.js.map