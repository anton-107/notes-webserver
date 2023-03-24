import { NotebookColumnValueType } from "./notebook-model";
export interface NoteType {
    type: string;
}
export interface NoteAttachment {
    id: string;
    noteID: string;
    name: string;
    fileExtension: string;
    objectKey: string;
    createdAt: string;
    owner: string;
}
export type NoteExtensionProperties = {
    [key: string]: string;
};
export interface Note {
    id: string;
    notebookID: string;
    owner: string;
    type: NoteType;
    content: string;
    extensionProperties?: NoteExtensionProperties;
    columnValues?: {
        [key: string]: NotebookColumnValueType;
    };
}
export interface RenderedNote extends Note {
    renderedContent: string;
}
