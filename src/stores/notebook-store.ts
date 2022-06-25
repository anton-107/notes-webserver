export interface Notebook {
  id: string;
  name: string;
  owner: string;
}

export interface NotebookStore {
  add(notebook: Notebook): Promise<void>;
  listAll(owner: string): Promise<Notebook[]>;
}

export class InMemoryNotebookStore implements NotebookStore {
  private items: Notebook[] = [];

  public async add(notebook: Notebook) {
    this.items.push(notebook);
  }
  public async listAll(owner: string): Promise<Notebook[]> {
    return this.items.filter((x) => x.owner === owner);
  }
}
