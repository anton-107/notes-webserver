import { EntityView } from "../../controller/entity-controller";
import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse } from "../../http/http";
import { Note } from "../../model/note-model";
import { NoteTypeHandler, NoteTypesRegistry } from "../../registries/note-types-registry";
import { HtmlViewProperties } from "../interfaces";
export interface NoteHtmlViewProperties extends HtmlViewProperties {
    notebookID?: string;
    noteTypesRegistry: NoteTypesRegistry;
    corsHeaders: CORSHeaders;
}
export declare class NoteHtmlView implements EntityView<Note> {
    protected properties: NoteHtmlViewProperties;
    constructor(properties: NoteHtmlViewProperties);
    renderCreationFormOneEntity(partialNote: Partial<Note>): HttpResponse;
    renderEditingFormOneEntity(note: Note): HttpResponse;
    renderDetailsPageOneEntity(entity: Note): HttpResponse;
    renderMacroListOfNotes(notes: Note[]): string;
    renderMacroLinksToAddNotes(notebookID: string, noteTypes: NoteTypeHandler[]): string;
    renderListPageAllEntities(entities: Note[]): HttpResponse;
    private renderNote;
}
