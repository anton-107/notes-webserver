import { NotebookSection } from "../../model/notebook-model";
import { EntityStore } from "../entity-store";

export interface NotebookSectionStore extends EntityStore<NotebookSection> {
  listAllInNotebook(
    owner: string,
    notebookID: string
  ): Promise<NotebookSection[]>;
}
export class InMemoryNotebookSectionStore implements NotebookSectionStore {
  private items: NotebookSection[] = [];

  async getOne(owner: string, id: string): Promise<NotebookSection> {
    return this.items.find((x) => x.owner === owner && x.id === id);
  }
  public async listAll(owner: string): Promise<NotebookSection[]> {
    return this.items.filter((x) => x.owner === owner);
  }
  public async listAllInNotebook(
    owner: string,
    notebookID: string
  ): Promise<NotebookSection[]> {
    return this.items.filter(
      (x) => x.owner === owner && x.notebookID === notebookID
    );
  }
  async deleteOne(owner: string, id: string): Promise<void> {
    const index = this.items.findIndex((x) => x.owner === owner && x.id === id);
    if (index < 0) {
      throw Error("Section is not found");
    }
    this.items.splice(index, 1);
  }
  async editOne(entity: NotebookSection): Promise<void> {
    const item = this.items.find(
      (x) => x.owner === entity.owner && x.id === entity.id
    );
    if (!item) {
      console.error("Section is not found for edit", entity);
      throw Error("Section is not found");
    }
    Object.assign(item, entity);
  }
  async add(entity: NotebookSection): Promise<void> {
    this.items.push(entity);
  }
}
