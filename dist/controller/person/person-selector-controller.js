"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonSelectorController = void 0;
const person_selector_html_macro_1 = require("../../views/person/person-selector-html-macro");
class PersonSelectorController {
    constructor(properties) {
        this.properties = properties;
    }
    getRegularExpressionForMacro() {
        return /{{MACRO_PERSON_SELECTOR:?([A-z0-9-]+)?}}/;
    }
    async renderMacro(username, match) {
        const view = new person_selector_html_macro_1.PersonSelectorHtmlMacro();
        const selectedValue = match[1] || "";
        const people = await this.properties.personStore.listAll(username);
        return view.renderPersonSelectorMacro(people, selectedValue);
    }
}
exports.PersonSelectorController = PersonSelectorController;
//# sourceMappingURL=person-selector-controller.js.map