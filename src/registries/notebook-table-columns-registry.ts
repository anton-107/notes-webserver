import { NotebookTableColumn } from "../model/notebook-model";
import { NoteTypesRegistry } from "./note-types-registry";

export class NotebookTableColumnsRegistry {
  private columns: NotebookTableColumn[] = [];

  public addColumn(column: NotebookTableColumn) {
    this.columns.push(column);
  }
  public addColumnsFromNoteTypesRegistry(registry: NoteTypesRegistry) {
    const handlers = registry.listNoteTypeHandlers();
    for (const h of handlers) {
      const columns = h.listSupportedColumns();
      for (const c of columns) {
        this.addColumn(c);
      }
    }
  }
  public listColumns(): NotebookTableColumn[] {
    return this.columns;
  }
}
