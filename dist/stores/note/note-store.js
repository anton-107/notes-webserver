"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryNoteStore = void 0;
class InMemoryNoteStore {
    constructor() {
        this.items = [];
    }
    async add(note) {
        this.items.push(note);
    }
    async listAll(owner) {
        return this.items.filter((x) => x.owner === owner);
    }
    async listAllInNotebook(owner, notebookID) {
        return this.items.filter((x) => x.owner === owner && x.notebookID === notebookID);
    }
    async getOne(owner, id) {
        return this.items.find((x) => x.owner === owner && x.id === id);
    }
    async editOne(note) {
        const item = this.items.find((x) => x.owner === note.owner && x.id === note.id);
        if (!item) {
            console.error("Note is not found for edit", note);
            throw Error("Note is not found");
        }
        Object.assign(item, note);
    }
    async deleteOne(owner, id) {
        const index = this.items.findIndex((x) => x.owner === owner && x.id === id);
        if (index < 0) {
            throw Error("Note is not found");
        }
        this.items.splice(index, 1);
    }
}
exports.InMemoryNoteStore = InMemoryNoteStore;
//# sourceMappingURL=note-store.js.map