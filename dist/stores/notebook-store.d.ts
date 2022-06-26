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
export declare class InMemoryNotebookStore implements NotebookStore {
    private items;
    add(notebook: Notebook): Promise<void>;
    listAll(owner: string): Promise<Notebook[]>;
    getOne(owner: string, id: string): Promise<Notebook>;
}
