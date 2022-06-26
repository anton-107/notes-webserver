export interface Notebook {
  id: string;
  name: string;
  owner: string;
}

export interface NotebookStore {
  add(notebook: Notebook): Promise<void>;
  listAll(owner: string): Promise<Notebook[]>;
  getOne(owner: string, id: string): Promise<Notebook | undefined>;
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
}
