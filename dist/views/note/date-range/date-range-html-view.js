"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRangeHtmlView = void 0;
const http_1 = require("../../../http/http");
class DateRangeHtmlView {
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
          <label>Description
            <input name='note-content' data-testid='note-content-input' />
          </label>
          <label>Date start
            <input name='note-content' data-testid='date-range-start-input' />
          </label>
          <label>Date end
            <input name='note-content' data-testid='date-range-end-input' />
          </label>
          <div>
          * - enter dates in YYYY-MM-DD format
          </div>

          <button type='submit' data-testid='edit-notebook-button'>Add</button>
        </form>
        <a href='${this.properties.baseUrl}/notebook/${this.properties.notebookID}'>Cancel</a>
      `,
        };
    }
}
exports.DateRangeHtmlView = DateRangeHtmlView;
//# sourceMappingURL=date-range-html-view.js.map