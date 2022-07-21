import { EntityView } from "../../controller/entity-controller";
import { HttpResponse } from "../../http/http";
import { Note } from "../../model/note-model";
import { NoteTypeHandler } from "../../registries/note-types-registry";
import { HtmlViewProperties } from "../interfaces";
export interface NoteHtmlViewProperties extends HtmlViewProperties {
    notebookID?: string;
}
export declare class NoteHtmlView implements EntityView<Note> {
    private properties;
    constructor(properties: NoteHtmlViewProperties);
    renderCreationFormOneEntity(): HttpResponse;
    renderEditingFormOneEntity(note: Note): HttpResponse;
    renderDetailsPageOneEntity(entity: Note): HttpResponse;
    renderMacroListOfNotes(notes: Note[]): string;
    renderMacroLinksToAddNotes(notebookID: string, noteTypes: NoteTypeHandler[]): string;
}
