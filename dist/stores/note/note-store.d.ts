import { Note } from "notes-model/dist/note-model";
import { EntityStore } from "../entity-store";
export interface NoteStore extends EntityStore<Note> {
    add(note: Note): Promise<void>;
    listAll(owner: string): Promise<Note[]>;
    listAllInNotebook(owner: string, notebookID: string): Promise<Note[]>;
    editOne(note: Note): Promise<void>;
    deleteOne(owner: string, id: string): Promise<void>;
    deleteAllInNotebook(owner: string, notebookID: string): Promise<void>;
}
export declare class InMemoryNoteStore implements NoteStore {
    private items;
    add(note: Note): Promise<void>;
    listAll(owner: string): Promise<Note[]>;
    listAllInNotebook(owner: string, notebookID: string): Promise<Note[]>;
    getOne(owner: string, id: string): Promise<Note>;
    editOne(note: Note): Promise<void>;
    deleteOne(owner: string, id: string): Promise<void>;
    deleteAllInNotebook(owner: string, notebookID: string): Promise<void>;
}
