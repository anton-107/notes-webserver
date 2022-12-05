"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySearchStore = void 0;
class InMemorySearchStore {
    constructor(notebooksStore, notesStore) {
        this.notebooksStore = notebooksStore;
        this.notesStore = notesStore;
    }
    async search(user, keyword) {
        const notebooks = await this.notebooksStore.listAll(user);
        const matchingNotebooks = notebooks
            .filter((x) => x.name.includes(keyword))
            .map((x) => {
            return {
                entityType: "notebook",
                text: x.name,
            };
        });
        const notes = await this.notesStore.listAll(user);
        const matchingNotes = notes
            .filter((x) => x.content.includes(keyword))
            .map((x) => {
            return {
                entityType: "note",
                text: x.content,
            };
        });
        return [...matchingNotebooks, ...matchingNotes];
    }
}
exports.InMemorySearchStore = InMemorySearchStore;
//# sourceMappingURL=search-store.js.map