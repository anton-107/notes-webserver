import { SearchResult } from "../../model/search-result-model";
import { NoteStore } from "../note/note-store";
import { NotebookStore } from "../notebook/notebook-store";

export interface SearchStore {
  search(user: string, keyword: string): Promise<SearchResult[]>;
}

export class InMemorySearchStore implements SearchStore {
  constructor(
    private notebooksStore: NotebookStore,
    private notesStore: NoteStore
  ) {}
  public async search(user: string, keyword: string): Promise<SearchResult[]> {
    const notebooks = await this.notebooksStore.listAll(user);
    const matchingNotebooks: SearchResult[] = notebooks
      .filter((x) => x.name.includes(keyword))
      .map((x) => {
        return {
          entityType: "notebook",
          text: x.name,
        };
      });

    const notes = await this.notesStore.listAll(user);
    const matchingNotes: SearchResult[] = notes
      .filter((x) => x.content.includes(keyword))
      .map((x) => {
        return {
          entityType: "note",
          text: x.content,
        };
      });
    return [...matchingNotebooks, ...matchingNotes];
  }
}
