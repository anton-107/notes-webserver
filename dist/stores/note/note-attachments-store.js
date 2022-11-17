"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryNoteAttachmentsStore = void 0;
class InMemoryNoteAttachmentsStore {
    constructor() {
        this.items = [];
    }
    async add(attachment) {
        this.items.push(attachment);
    }
    async listAllForNote(owner, noteID) {
        return this.items.filter((x) => x.owner === owner && x.noteID === noteID);
    }
}
exports.InMemoryNoteAttachmentsStore = InMemoryNoteAttachmentsStore;
//# sourceMappingURL=note-attachments-store.js.map