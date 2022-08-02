import { NoteStore } from "./note-store";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import { Notebook } from "../../model/notebook-model";
import { Note, NoteType } from "../../model/note-model";
export declare class NoteEntity implements Note {
    owner: string;
    sortKey: string;
    id: string;
    notebook: Notebook;
    type: NoteType;
    content: string;
    extensionProperties?: {
        [key: string]: string;
    };
}
interface NoteStoreDynamodbProps {
    dataMapper: DataMapper;
}
export declare class NoteStoreDynamodb implements NoteStore {
    private properties;
    constructor(properties: NoteStoreDynamodbProps);
    add(note: Note): Promise<void>;
    listAll(owner: string): Promise<Note[]>;
    getOne(owner: string, id: string): Promise<Note | null>;
    deleteOne(owner: string, id: string): Promise<void>;
    editOne(note: Note): Promise<void>;
    listAllInNotebook(owner: string, notebookID: string): Promise<Note[]>;
}
export {};
