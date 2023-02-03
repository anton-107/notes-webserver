export type NotebookStatus = "" | "MARKED_FOR_DELETION";
export interface NotebookSection {
    id: string;
    name: string;
}
export type NotebookColumnValueType = "string" | "date" | "datetime" | "boolean" | "person-id" | "note-id" | "notebook-id";
export interface NotebookTableColumn {
    name: string;
    columnType: string;
    valueType: NotebookColumnValueType;
}
export interface Notebook {
    id: string;
    name: string;
    owner: string;
    sections: NotebookSection[];
    tableColumns: NotebookTableColumn[];
    createdAt: string;
    updatedAt: string;
    status: NotebookStatus;
}
