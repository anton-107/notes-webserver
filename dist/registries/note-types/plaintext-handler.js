"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaintextHandler = void 0;
class PlaintextHandler {
    typeName() {
        return "plaintext";
    }
    typeDisplayName() {
        return "Plain text";
    }
    render(note) {
        return {
            ...note,
            renderedContent: note.content,
        };
    }
}
exports.PlaintextHandler = PlaintextHandler;
//# sourceMappingURL=plaintext-handler.js.map