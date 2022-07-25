"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaintextNoteHandler = void 0;
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
            renderedContent: note.content,
        };
    }
    renderEditForm(note) {
        return `<textarea name='note-content' data-testid='note-content-input'>${note.content}</textarea>`;
    }
}
exports.PlaintextNoteHandler = PlaintextNoteHandler;
//# sourceMappingURL=plaintext-handler.js.map