import { NotebookTableColumn } from "../model/notebook-model";
export declare class NotebookTableColumnsRegistry {
    private columns;
    addColumn(handler: NotebookTableColumn): void;
    listColumns(): NotebookTableColumn[];
}
