"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalDateRangeNoteHandler = void 0;
const short_uuid_1 = require("short-uuid");
class PersonalDateRangeNoteHandler {
    typeName() {
        return "personal-date-range";
    }
    typeDisplayName() {
        return "personal date range entry";
    }
    mapRequestToNewEntity(username, form) {
        return {
            id: (0, short_uuid_1.generate)(),
            notebook: { id: form["notebook-id"], name: "", owner: "" },
            owner: username,
            type: { type: this.typeName() },
            content: form["note-content"],
            extensionProperties: {
                personID: form["person-id"],
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
                personID: form["person-id"],
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
      <div><span data-testid='person-name'>${note.extensionProperties.personID}</span></div>
      <div>Date start: <span data-testid='date-range-start'>${note.extensionProperties.dateRangeStart}</span></div>
      <div>Date start: <span data-testid='date-range-end'>${note.extensionProperties.dateRangeEnd}</span></div>
    `;
    }
    renderCreateForm() {
        return `
      <label>Person
        <select name='person-id' data-testid='person-selector'>
          <option value='justin-case'>Justin Case</option>
          <option value='john-rope'>John Rope</option>
        </select>
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
    <label>Person
    <select name='person-id' data-testid='person-selector'>
      <option ${note.extensionProperties.personID === "justin-case" ? "selected" : ""} value='justin-case'>Justin Case</option>
      <option ${note.extensionProperties.personID === "john-rope" ? "selected" : ""} value='john-rope'>John Rope</option>
    </select>
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
exports.PersonalDateRangeNoteHandler = PersonalDateRangeNoteHandler;
//# sourceMappingURL=personal-date-range-handler.js.map