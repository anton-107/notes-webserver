"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostProcessor = void 0;
const person_selector_html_macro_1 = require("../views/person/person-selector-html-macro");
class PostProcessor {
    async processResponse(response) {
        response.body = await this.showPersonSelector(response.body);
        return response;
    }
    async showPersonSelector(body) {
        const regexp = /{{MACRO_PERSON_SELECTOR:?([A-z0-9-]+)?}}/;
        const match = body.match(regexp);
        if (match) {
            const view = new person_selector_html_macro_1.PersonSelectorHtmlMacro();
            const selectedValue = match[1] || "";
            const people = [
                { id: 'justin-case', name: 'Justin Case', email: '', manager: '' },
                { id: 'john-rope', name: 'John Rope', email: '', manager: '' },
            ];
            return body.replace(regexp, view.renderPersonSelectorMacro(people, selectedValue));
        }
        return body;
    }
}
exports.PostProcessor = PostProcessor;
//# sourceMappingURL=post-processor.js.map