import { Notebook } from "notes-model/dist/notebook-model";

import { EntityStore } from "../entity-store";

export interface NotebookStore extends EntityStore<Notebook> {
  add(notebook: Notebook): Promise<void>;
  editOne(notebook: Notebook): Promise<void>;
  deleteOne(owner: string, id: string): Promise<void>;
}

export class InMemoryNotebookStore implements NotebookStore {
  private items: Notebook[] = [];

  public async add(notebook: Notebook) {
    this.items.push(notebook);
  }
  public async listAll(owner: string): Promise<Notebook[]> {
    return this.items.filter(
      (x) => x.owner === owner && x.status !== "MARKED_FOR_DELETION"
    );
  }
  public async getOne(owner: string, id: string): Promise<Notebook> {
    return this.items.find((x) => x.owner === owner && x.id === id);
  }
  public async editOne(notebook: Notebook): Promise<void> {
    const item = this.items.find(
      (x) => x.owner === notebook.owner && x.id === notebook.id
    );
    if (!item) {
      throw Error("Notebook is not found");
    }
    item.name = notebook.name;
  }
  public async deleteOne(owner: string, id: string): Promise<void> {
    const index = this.items.findIndex((x) => x.owner === owner && x.id === id);
    if (index < 0) {
      throw Error("Notebook is not found");
    }
    this.items.splice(index, 1);
  }
}
