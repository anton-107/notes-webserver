import { NotebookTableColumn } from "../model/notebook-model";

export class NotebookTableColumnsRegistry {
  private columns: NotebookTableColumn[] = [];

  public addColumn(handler: NotebookTableColumn) {
    this.columns.push(handler);
  }
  public listColumns(): NotebookTableColumn[] {
    return this.columns;
  }
}
