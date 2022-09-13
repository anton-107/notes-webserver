"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaintextNoteHandler = void 0;
const short_uuid_1 = require("short-uuid");
class PlaintextNoteHandler {
    typeName() {
        return "note";
    }
    typeDisplayName() {
        return "plain note";
    }
    render(note) {
        return {
            ...note,
            renderedContent: `<div data-testid='note-content'>${note.content}</div>`,
        };
    }
    renderEditForm(note) {
        return `<textarea name='note-content' data-testid='note-content-input'>${note.content}</textarea>`;
    }
    mapRequestToExistingEntity(username, existingNote, form) {
        const r = { ...existingNote };
        r.content = form["note-content"];
        return r;
    }
    renderCreateForm() {
        return `<textarea name='note-content' data-testid='note-content-input'></textarea>`;
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
}
exports.PlaintextNoteHandler = PlaintextNoteHandler;
//# sourceMappingURL=plaintext-handler.js.map