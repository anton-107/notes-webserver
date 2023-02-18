import { Note } from "../../model/note-model";
import { EntityStore } from "../entity-store";

export interface NoteStore extends EntityStore<Note> {
  add(note: Note): Promise<void>;
  listAll(owner: string): Promise<Note[]>;
  listAllInNotebook(owner: string, notebookID: string): Promise<Note[]>;
  editOne(note: Note): Promise<void>;
  deleteOne(owner: string, id: string): Promise<void>;
  deleteAllInNotebook(owner: string, notebookID: string): Promise<void>;
}

export class InMemoryNoteStore implements NoteStore {
  private items: Note[] = [];

  public async add(note: Note) {
    this.items.push(note);
  }
  public async listAll(owner: string): Promise<Note[]> {
    return this.items.filter((x) => x.owner === owner);
  }
  public async listAllInNotebook(
    owner: string,
    notebookID: string
  ): Promise<Note[]> {
    return this.items.filter(
      (x) => x.owner === owner && x.notebookID === notebookID
    );
  }
  public async getOne(owner: string, id: string): Promise<Note> {
    return this.items.find((x) => x.owner === owner && x.id === id);
  }
  public async editOne(note: Note): Promise<void> {
    const item = this.items.find(
      (x) => x.owner === note.owner && x.id === note.id
    );
    if (!item) {
      throw Error("Note is not found");
    }
    Object.assign(item, note);
  }
  public async deleteOne(owner: string, id: string): Promise<void> {
    const index = this.items.findIndex((x) => x.owner === owner && x.id === id);
    if (index < 0) {
      throw Error("Note is not found");
    }
    this.items.splice(index, 1);
  }
  public async deleteAllInNotebook(
    owner: string,
    notebookID: string
  ): Promise<void> {
    const newItems = this.items.filter(
      (x) => x.owner !== owner || x.notebookID !== notebookID
    );
    this.items = newItems;
  }
}
