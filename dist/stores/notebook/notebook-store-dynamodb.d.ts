import { NotebookStore } from "./notebook-store";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import { Notebook } from "../../model/notebook-model";
export declare class NotebookEntity implements Notebook {
    owner: string;
    sortKey: string;
    name: string;
    id: string;
}
interface NotebookStoreDynamodbProps {
    dataMapper: DataMapper;
}
export declare class NotebookStoreDynamodb implements NotebookStore {
    private properties;
    constructor(properties: NotebookStoreDynamodbProps);
    add(notebook: Notebook): Promise<void>;
    listAll(owner: string): Promise<Notebook[]>;
    getOne(owner: string, id: string): Promise<Notebook | null>;
    deleteOne(owner: string, id: string): Promise<void>;
    editOne(notebook: Notebook): Promise<void>;
}
export {};
