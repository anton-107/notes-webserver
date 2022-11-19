import { FormBody } from "../../http/body-parser";
import { HttpResponse } from "../../http/http";
import { Note } from "../../model/note-model";
import { NoteTypesRegistry } from "../../registries/note-types-registry";
import { AttachmentsStore } from "../../stores/attachments/attachments-store";
import { NoteAttachmentsStore } from "../../stores/note/note-attachments-store";
import { NoteStore } from "../../stores/note/note-store";
import { NotebookStore } from "../../stores/notebook/notebook-store";
import { EntityController, EntityControllerProperties } from "../entity-controller";
export interface NoteControllerProperties extends EntityControllerProperties<Note> {
    noteStore: NoteStore;
    noteAttachmentsStore: NoteAttachmentsStore;
    notebookStore: NotebookStore;
    attachmentsStore: AttachmentsStore;
    notebookID: string | null;
    noteTypesRegistry: NoteTypesRegistry;
    noteType: string;
}
export declare class NoteController extends EntityController<Note> {
    private noteControllerProperties;
    constructor(noteControllerProperties: NoteControllerProperties);
    showCreateNewEntityPage(): Promise<HttpResponse>;
    showNotesInNotebook(notebookID: string): Promise<HttpResponse>;
    downloadAttachment(noteID: string, attachmentID: string): Promise<HttpResponse>;
    protected getEntityName(): string;
    protected mapRequestToEntityID(requestForm: FormBody): string;
    protected mapRequestToExistingEntity(username: string, existingNote: Note, form: FormBody): Note;
    protected mapRequestToNewEntity(username: string, form: FormBody): Note;
    protected isAuthorizedToCreate(user: string, entity: Note): Promise<boolean>;
    protected getEntityURL(note: Note): string;
}
