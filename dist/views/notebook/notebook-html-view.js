"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookHtmlView = void 0;
const http_1 = require("../../http/http");
class NotebookHtmlView {
    constructor(properties) {
        this.properties = properties;
    }
    renderEditingFormOneEntity(notebook) {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
            body: `
        <h1 data-testid='notebook-name'>${notebook.name}</h1>
        <form method='post' action='${this.properties.baseUrl}/notebook/${notebook.id}/edit'>
          <input type='hidden' name='notebook-id' value='${notebook.id}' />
          <input type='text' name='notebook-name' value='${notebook.name}' data-testid='notebook-name-input' />
          <button type='submit' data-testid='edit-notebook-button'>Update</button>
        </form>
        <a href='${this.properties.baseUrl}/notebook/${notebook.id}'>Cancel edit</a>
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
            body: `<form method='post' action='${this.properties.baseUrl}/notebook'>
        <input name='notebook-name' data-testid='notebook-name-input' />
        <input type='submit' />
      </form>`,
        };
    }
    renderDetailsPageOneEntity(notebook) {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
            body: `
        <h1 data-testid='notebook-name'>${notebook.name}</h1>
        <a href='${this.properties.baseUrl}/notebook/${notebook.id}/edit' data-testid='edit-notebook-link'>Edit this notebook</a>
        <form method='post' action='${this.properties.baseUrl}/delete-notebook'>
          <input type='hidden' name='notebookID' value='${notebook.id}' />
          <button type='submit' data-testid='delete-notebook-button'>Delete this notebook</button>
        </form>
      `,
        };
    }
}
exports.NotebookHtmlView = NotebookHtmlView;
//# sourceMappingURL=notebook-html-view.js.map