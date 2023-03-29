export type NotebookStatus = "" | "MARKED_FOR_DELETION" | "DELETION_FAILED";

export interface NotebookSection {
  id: string;
  name: string;
}

export type NotebookColumnValueType =
  | "string"
  | "date"
  | "datetime"
  | "boolean"
  | "number"
  | "person-id"
  | "note-id"
  | "notebook-id"
  | "list-of-objects";

type NotebookColumnValueSource = "columnValues" | "extensionProperties";

export interface NotebookTableColumn {
  name: string;
  columnType: string;
  valueType: NotebookColumnValueType;
  valueSource: NotebookColumnValueSource;
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
