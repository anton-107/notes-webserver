import { FormBody } from "../../http/body-parser";
import { HttpResponse } from "../../http/http";
import { Notebook } from "../../model/notebook-model";
import { NoteStore } from "../../stores/note/note-store";
import { NoteHtmlView } from "../../views/note/note-html-view";
import { EntityController, EntityControllerProperties } from "../entity-controller";
export interface NotebookControllerProperties extends EntityControllerProperties<Notebook> {
    noteHtmlView: NoteHtmlView;
    noteStore: NoteStore;
}
export declare class NotebookController extends EntityController<Notebook> {
    private notebookControllerProperties;
    constructor(notebookControllerProperties: NotebookControllerProperties);
    protected getEntityName(): string;
    protected mapRequestToExistingEntity(username: string, form: FormBody): Notebook;
    protected mapRequestToNewEntity(username: string, form: FormBody): Notebook;
    protected isAuthorizedToCreate(user: string, entity: Notebook): Promise<boolean>;
    protected getEntityURL(entity: Notebook): string;
    showSingleEntityDetailsPage(entityID: string): Promise<HttpResponse>;
    private showNotesInNotebook;
}
