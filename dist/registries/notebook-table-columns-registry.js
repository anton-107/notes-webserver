"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookTableColumnsRegistry = void 0;
class NotebookTableColumnsRegistry {
    constructor() {
        this.columns = [];
    }
    addColumn(handler) {
        this.columns.push(handler);
    }
    listColumns() {
        return this.columns;
    }
}
exports.NotebookTableColumnsRegistry = NotebookTableColumnsRegistry;
//# sourceMappingURL=notebook-table-columns-registry.js.map