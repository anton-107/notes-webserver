export interface Notebook {
  id: string;
  name: string;
  owner: string;
}

export interface NotebookStore {
  add(notebook: Notebook): Promise<void>;
  listAll(owner: string): Promise<Notebook[]>;
  getOne(owner: string, id: string): Promise<Notebook | undefined>;
  deleteOne(owner: string, id: string): Promise<void>;
}

export class InMemoryNotebookStore implements NotebookStore {
  private items: Notebook[] = [];

  public async add(notebook: Notebook) {
    this.items.push(notebook);
  }
  public async listAll(owner: string): Promise<Notebook[]> {
    return this.items.filter((x) => x.owner === owner);
  }
  public async getOne(owner: string, id: string): Promise<Notebook> {
    return this.items.find((x) => x.owner === owner && x.id === id);
  }
  public async deleteOne(owner: string, id: string): Promise<void> {
    const index = this.items.findIndex((x) => x.owner === owner && x.id === id);
    if (index < 0) {
      throw Error("Notebook is not found");
    }
    this.items.splice(index, 1);
  }
}
