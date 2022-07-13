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
}
exports.NoteTypesRegistry = NoteTypesRegistry;
//# sourceMappingURL=note-types-registry.js.map