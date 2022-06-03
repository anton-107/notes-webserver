export interface Notebook {
  name: string;
  owner: string;
}

export class NotebookStore {
  private items: Notebook[] = [];

  public async add(notebook: Notebook) {
    this.items.push(notebook);
  }
  public async listAll(owner: string): Promise<Notebook[]> {
    return this.items.filter((x) => x.owner === owner);
  }
}
