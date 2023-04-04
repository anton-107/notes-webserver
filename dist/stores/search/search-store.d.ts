import { SearchResult } from "notes-model/dist/search-result-model";
import { NoteStore } from "../note/note-store";
import { NotebookStore } from "../notebook/notebook-store";
export interface SearchStore {
    search(user: string, keyword: string): Promise<SearchResult[]>;
}
export declare class InMemorySearchStore implements SearchStore {
    private notebooksStore;
    private notesStore;
    constructor(notebooksStore: NotebookStore, notesStore: NoteStore);
    search(user: string, keyword: string): Promise<SearchResult[]>;
}
