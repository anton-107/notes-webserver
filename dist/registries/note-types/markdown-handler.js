"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownHandler = void 0;
class MarkdownHandler {
    typeName() {
        return "markdown";
    }
    typeDisplayName() {
        return "Markdown formatting";
    }
    render(note) {
        return {
            ...note,
            renderedContent: note.content,
        };
    }
}
exports.MarkdownHandler = MarkdownHandler;
//# sourceMappingURL=markdown-handler.js.map