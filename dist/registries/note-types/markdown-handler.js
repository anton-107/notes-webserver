"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownHandler = void 0;
class MarkdownHandler {
    typeName() {
        return "markdown";
    }
    typeDisplayName() {
        return "markdown formatted note";
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
exports.MarkdownHandler = MarkdownHandler;
//# sourceMappingURL=markdown-handler.js.map