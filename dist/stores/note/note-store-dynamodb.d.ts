import { DataMapper } from "@aws/dynamodb-data-mapper";
import { Note, NoteType } from "notes-model/dist/note-model";
import { NotebookColumnValueType } from "notes-model/dist/notebook-model";
import { Logger } from "../../logger/logger";
import { NoteStore } from "./note-store";
export declare class NoteEntity implements Note {
    owner: string;
    sortKey: string;
    id: string;
    notebookID: string;
    type: NoteType;
    content: string;
    extensionProperties?: {
        [key: string]: string;
    };
    columnValues?: {
        [key: string]: NotebookColumnValueType;
    };
}
interface NoteStoreDynamodbProps {
    logger: Logger;
    dataMapper: DataMapper;
}
export declare class NoteStoreDynamodb implements NoteStore {
    private properties;
    constructor(properties: NoteStoreDynamodbProps);
    add(note: Note): Promise<void>;
    listAll(owner: string): Promise<Note[]>;
    getOne(owner: string, id: string): Promise<Note | null>;
    deleteOne(owner: string, id: string): Promise<void>;
    deleteAllInNotebook(owner: string, notebookID: string): Promise<void>;
    editOne(note: Note): Promise<void>;
    listAllInNotebook(owner: string, notebookID: string): Promise<Note[]>;
}
export {};
