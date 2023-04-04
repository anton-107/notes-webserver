import { Notebook } from "notes-model/dist/notebook-model";
import { EntityStore } from "../entity-store";
export interface NotebookStore extends EntityStore<Notebook> {
    add(notebook: Notebook): Promise<void>;
    editOne(notebook: Notebook): Promise<void>;
    deleteOne(owner: string, id: string): Promise<void>;
}
export declare class InMemoryNotebookStore implements NotebookStore {
    private items;
    add(notebook: Notebook): Promise<void>;
    listAll(owner: string): Promise<Notebook[]>;
    getOne(owner: string, id: string): Promise<Notebook>;
    editOne(notebook: Notebook): Promise<void>;
    deleteOne(owner: string, id: string): Promise<void>;
}
