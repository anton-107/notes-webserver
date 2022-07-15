"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteHtmlView = void 0;
const http_1 = require("../../http/http");
class NoteHtmlView {
    constructor(properties) {
        this.properties = properties;
    }
    renderEditingFormOneEntity(note) {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
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
          <button type='submit' data-testid='edit-notebook-button'>Update</button>
        </form>
        <a href='${this.properties.baseUrl}/notebook/${this.properties.notebookID}'>Cancel</a>
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
      ${notes.map((note) => `<div data-testid='note-content'>${note.content}</div>`)}
    `;
    }
}
exports.NoteHtmlView = NoteHtmlView;
//# sourceMappingURL=note-html-view.js.map