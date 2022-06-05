"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookStore = void 0;
class NotebookStore {
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
exports.NotebookStore = NotebookStore;
//# sourceMappingURL=notebook-store.js.map