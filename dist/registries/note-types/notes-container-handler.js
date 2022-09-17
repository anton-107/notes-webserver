"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesContainerHandler = void 0;
const short_uuid_1 = require("short-uuid");
class NotesContainerHandler {
    typeName() {
        return "notes-container";
    }
    typeDisplayName() {
        return "Section";
    }
    render(note) {
        return {
            ...note,
            renderedContent: `<div data-testid='note-section-content'>Section: ${note.content}</div>`,
        };
    }
    renderCreateForm() {
        return `<input name='note-content' data-testid='note-content-input' />`;
    }
    renderEditForm(note) {
        return `<input name='note-content' data-testid='note-content-input' value='${note.content}' />`;
    }
    mapRequestToNewEntity(username, form) {
        return {
            id: (0, short_uuid_1.generate)(),
            notebookID: form["notebook-id"],
            owner: username,
            type: { type: this.typeName() },
            content: form["note-content"],
        };
    }
    mapRequestToExistingEntity(username, existingNote, form) {
        const r = { ...existingNote };
        r.content = form["note-content"];
        return r;
    }
}
exports.NotesContainerHandler = NotesContainerHandler;
//# sourceMappingURL=notes-container-handler.js.map