import { EntityController, EntityControllerProperties } from "../entity-controller";
import { Note } from "../../model/note-model";
import { FormBody } from "../../http/body-parser";
import { NotebookStore } from "../../stores/notebook/notebook-store";
export interface NoteControllerProperties extends EntityControllerProperties<Note> {
    notebookStore: NotebookStore;
}
export declare class NoteController extends EntityController<Note> {
    private noteControllerProperties;
    constructor(noteControllerProperties: NoteControllerProperties);
    protected getEntityName(): string;
    protected mapRequestToExistingEntity(username: string, form: FormBody): Note;
    protected mapRequestToNewEntity(username: string, form: FormBody): Note;
    protected isAuthorizedToCreate(user: string, entity: Note): Promise<boolean>;
    protected getEntityURL(note: Note): string;
}
