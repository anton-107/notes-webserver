"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRangeNoteHandler = void 0;
const short_uuid_1 = require("short-uuid");
class DateRangeNoteHandler {
    isMatchForAutoType() {
        return false;
    }
    typeName() {
        return "date-range";
    }
    typeDisplayName() {
        return "date range entry";
    }
    mapRequestToNewEntity(username, form) {
        return {
            id: (0, short_uuid_1.generate)(),
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
    mapRequestToExistingEntity(username, existingNote, form) {
        return {
            ...existingNote,
            content: form["note-content"],
            extensionProperties: {
                dateRangeStart: form["date-range-start"],
                dateRangeEnd: form["date-range-end"],
            },
        };
    }
    render(note) {
        return {
            ...note,
            renderedContent: this.htmlView(note),
        };
    }
    htmlView(note) {
        return `
      <div><span data-testid='note-content'>${note.content}</span></div>
      <div>Date start: <span data-testid='date-range-start'>${note.extensionProperties.dateRangeStart}</span></div>
      <div>Date end: <span data-testid='date-range-end'>${note.extensionProperties.dateRangeEnd}</span></div>
    `;
    }
    renderCreateForm() {
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
    renderEditForm(note) {
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
exports.DateRangeNoteHandler = DateRangeNoteHandler;
//# sourceMappingURL=date-range-handler.js.map