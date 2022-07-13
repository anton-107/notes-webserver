import { Notebook } from "./notebook-model";
interface NoteType {
    type: string;
}
export interface Note {
    id: string;
    notebook: Notebook;
    owner: string;
    type: NoteType;
    content: string;
}
export interface RenderedNote extends Note {
    renderedContent: string;
}
export {};
