export interface NotebookSection {
  id: string;
  name: string;
  notebookID: string;
  owner: string;
}

export interface Notebook {
  id: string;
  name: string;
  owner: string;
  sections: NotebookSection[];
}
