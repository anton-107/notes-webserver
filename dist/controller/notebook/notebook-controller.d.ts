import { FormBody } from "../../http/body-parser";
import { HttpResponse } from "../../http/http";
import { Logger } from "../../logger/logger";
import { Notebook } from "../../model/notebook-model";
import { NoteTypesRegistry } from "../../registries/note-types-registry";
import { NotebookTableColumnsRegistry } from "../../registries/notebook-table-columns-registry";
import { NoteStore } from "../../stores/note/note-store";
import { NoteHtmlView } from "../../views/note/note-html-view";
import { NotebookJsonView } from "../../views/notebook/notebook-json-view";
import { EntityController, EntityControllerProperties } from "../entity-controller";
export interface NotebookControllerProperties extends EntityControllerProperties<Notebook> {
    notebookJsonView: NotebookJsonView;
    noteHtmlView: NoteHtmlView;
    noteStore: NoteStore;
    noteTypesRegistry: NoteTypesRegistry;
    notebookTableColumnsRegistry: NotebookTableColumnsRegistry;
}
export declare class NotebookController extends EntityController<Notebook> {
    private notebookControllerProperties;
    protected logger: Logger;
    constructor(notebookControllerProperties: NotebookControllerProperties);
    listSupportedColumns(): Promise<HttpResponse>;
    protected getEntityName(): string;
    protected mapRequestToEntityID(requestForm: FormBody): string;
    protected mapRequestToExistingEntity(username: string, existingNotebook: Notebook, form: FormBody): Notebook;
    protected mapRequestToNewEntity(username: string, form: FormBody): Notebook;
    protected isAuthorizedToCreate(user: string, entity: Notebook): Promise<boolean>;
    protected getEntityURL(entity: Notebook): string;
    showSingleEntityDetailsPage(entityID: string): Promise<HttpResponse>;
    private showNotesInNotebook;
    private showLinksToAddNotes;
}
