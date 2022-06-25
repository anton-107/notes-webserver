export interface Notebook {
    id: string;
    name: string;
    owner: string;
}
export interface NotebookStore {
    add(notebook: Notebook): Promise<void>;
    listAll(owner: string): Promise<Notebook[]>;
}
export declare class InMemoryNotebookStore implements NotebookStore {
    private items;
    add(notebook: Notebook): Promise<void>;
    listAll(owner: string): Promise<Notebook[]>;
}
