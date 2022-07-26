import { FormBody } from "../../http/body-parser";
import { Note } from "../../model/note-model";
import { NoteTypesRegistry } from "../../registries/note-types-registry";
import { NotebookStore } from "../../stores/notebook/notebook-store";
import { EntityController, EntityControllerProperties } from "../entity-controller";
export interface NoteControllerProperties extends EntityControllerProperties<Note> {
    notebookStore: NotebookStore;
    notebookID: string | null;
    noteTypesRegistry: NoteTypesRegistry;
}
export declare class NoteController extends EntityController<Note> {
    private noteControllerProperties;
    constructor(noteControllerProperties: NoteControllerProperties);
    protected getEntityName(): string;
    protected mapRequestToEntityID(requestForm: FormBody): string;
    protected mapRequestToExistingEntity(username: string, existingNote: Note, form: FormBody): Note;
    protected mapRequestToNewEntity(username: string, form: FormBody): Note;
    protected isAuthorizedToCreate(user: string, entity: Note): Promise<boolean>;
    protected getEntityURL(note: Note): string;
}
