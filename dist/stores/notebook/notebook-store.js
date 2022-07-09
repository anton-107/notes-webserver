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
    async getOne(owner, id) {
        return this.items.find((x) => x.owner === owner && x.id === id);
    }
    async editOne(notebook) {
        const item = this.items.find((x) => x.owner === notebook.owner && x.id === notebook.id);
        if (!item) {
            console.error("Notebook is not found for edit", notebook);
            throw Error("Notebook is not found");
        }
        item.name = notebook.name;
    }
    async deleteOne(owner, id) {
        const index = this.items.findIndex((x) => x.owner === owner && x.id === id);
        if (index < 0) {
            throw Error("Notebook is not found");
        }
        this.items.splice(index, 1);
    }
}
exports.InMemoryNotebookStore = InMemoryNotebookStore;
//# sourceMappingURL=notebook-store.js.map