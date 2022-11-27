import { DataMapper } from "@aws/dynamodb-data-mapper";

import { Logger } from "../../logger/logger";
import { Notebook, NotebookSection, NotebookTableColumn } from "../../model/notebook-model";
import { NotebookStore } from "./notebook-store";
export declare class NotebookEntity implements Notebook {
    owner: string;
    sortKey: string;
    name: string;
    id: string;
    sections: NotebookSection[];
    tableColumns: NotebookTableColumn[];
    createdAt: string;
    updatedAt: string;
}
interface NotebookStoreDynamodbProps {
    logger: Logger;
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
