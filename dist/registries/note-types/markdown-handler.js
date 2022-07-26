"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownHandler = void 0;
const plaintext_handler_1 = require("./plaintext-handler");
class MarkdownHandler extends plaintext_handler_1.PlaintextNoteHandler {
    typeName() {
        return "markdown";
    }
    typeDisplayName() {
        return "markdown formatted note";
    }
}
exports.MarkdownHandler = MarkdownHandler;
//# sourceMappingURL=markdown-handler.js.map