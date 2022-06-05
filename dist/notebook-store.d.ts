export interface Notebook {
    name: string;
    owner: string;
}
export declare class NotebookStore {
    private items;
    add(notebook: Notebook): Promise<void>;
    listAll(owner: string): Promise<Notebook[]>;
}
