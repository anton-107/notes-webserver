"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalDateRangeNoteHandler = void 0;
const date_range_handler_1 = require("./date-range-handler");
class PersonalDateRangeNoteHandler extends date_range_handler_1.DateRangeNoteHandler {
    isMatchForAutoType() {
        return false;
    }
    typeName() {
        return "personal-date-range";
    }
    typeDisplayName() {
        return "personal date range entry";
    }
    mapRequestToNewEntity(username, form) {
        const entity = super.mapRequestToNewEntity(username, form);
        entity.extensionProperties.personID = form["person-id"];
        return entity;
    }
    mapRequestToExistingEntity(username, existingNote, form) {
        const entity = super.mapRequestToExistingEntity(username, existingNote, form);
        entity.extensionProperties.personID = form["person-id"];
        return entity;
    }
    render(note) {
        return {
            ...note,
            renderedContent: this.htmlView(note),
        };
    }
    htmlView(note) {
        return `
      <div>{{MACRO_PERSON_SHORT_REPRESENTATION:${note.extensionProperties.personID}}}</div>
      <div>Date start: <span data-testid='date-range-start'>${note.extensionProperties.dateRangeStart}</span></div>
      <div>Date start: <span data-testid='date-range-end'>${note.extensionProperties.dateRangeEnd}</span></div>
    `;
    }
    renderCreateForm() {
        return `
      <label>Person
        {{MACRO_PERSON_SELECTOR}}
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
      {{MACRO_PERSON_SELECTOR:${note.extensionProperties.personID}}}
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