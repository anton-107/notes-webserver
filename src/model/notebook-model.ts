export interface NotebookSection {
  id: string;
  name: string;
}

export interface NotebookTableColumn {
  name: string;
  columnType: string;
}

export interface Notebook {
  id: string;
  name: string;
  owner: string;
  sections: NotebookSection[];
  tableColumns: NotebookTableColumn[];
}
