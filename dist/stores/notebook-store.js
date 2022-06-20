"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryNotebookStore = void 0;
class InMemoryNotebookStore {
    constructor() {
        this.items = [];
    }
    async add(notebook) {
        this.items.push(notebook);
    }
    async listAll(owner) {
        return this.items.filter((x) => x.owner === owner);
    }
}
exports.InMemoryNotebookStore = InMemoryNotebookStore;
//# sourceMappingURL=notebook-store.js.map