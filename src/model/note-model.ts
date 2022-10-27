import { NotebookColumnValueType } from "./notebook-model";

export interface NoteType {
  type: string;
}

export interface Note {
  id: string;
  notebookID: string;
  owner: string;
  type: NoteType;
  content: string;
  extensionProperties?: { [key: string]: string };
  columnValues?: { [key: string]: NotebookColumnValueType };
}
export interface RenderedNote extends Note {
  renderedContent: string;
}
