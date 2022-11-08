"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteTypesRegistry = void 0;
class NoteTypesRegistry {
    constructor() {
        this.handlers = [];
    }
    addNoteTypeHandler(handler) {
        this.handlers.push(handler);
    }
    listNoteTypeHandlers() {
        return this.handlers;
    }
    getNoteTypeHandler(noteTypeName) {
        return this.handlers.find((x) => x.typeName() === noteTypeName);
    }
    getAutoType(content) {
        const handler = this.handlers.find((x) => x.isMatchForAutoType(content));
        if (!handler) {
            return null;
        }
        return handler.typeName();
    }
}
exports.NoteTypesRegistry = NoteTypesRegistry;
//# sourceMappingURL=note-types-registry.js.map