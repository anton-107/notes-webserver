"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookTableColumnsRegistry = void 0;
class NotebookTableColumnsRegistry {
    constructor() {
        this.columns = [];
    }
    addColumn(column) {
        this.columns.push(column);
    }
    addColumnsFromNoteTypesRegistry(registry) {
        const handlers = registry.listNoteTypeHandlers();
        for (const h of handlers) {
            const columns = h.listSupportedColumns();
            for (const c of columns) {
                this.addColumn(c);
            }
        }
    }
    listColumns() {
        return this.columns;
    }
}
exports.NotebookTableColumnsRegistry = NotebookTableColumnsRegistry;
//# sourceMappingURL=notebook-table-columns-registry.js.map