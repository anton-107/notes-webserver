"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonSelectorHtmlMacro = void 0;
class PersonSelectorHtmlMacro {
    renderPersonSelectorMacro(people, selectedValue) {
        return `
      <select name='person-id' data-testid='person-selector'>
        ${people.map(person => `<option ${selectedValue === person.id ? "selected" : ""} value='${person.id}'>${person.name}</option>`).join("")}
      </select>
    `;
    }
}
exports.PersonSelectorHtmlMacro = PersonSelectorHtmlMacro;
//# sourceMappingURL=person-selector-html-macro.js.map