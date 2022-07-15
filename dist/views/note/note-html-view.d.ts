import { EntityView } from "../../controller/entity-controller";
import { HttpResponse } from "../../http/http";
import { Note } from "../../model/note-model";
import { HtmlViewProperties } from "../interfaces";
export interface NoteHtmlViewProperties extends HtmlViewProperties {
    notebookID?: string;
}
export declare class NoteHtmlView implements EntityView<Note> {
    private properties;
    constructor(properties: NoteHtmlViewProperties);
    renderEditingFormOneEntity(note: Note): HttpResponse;
    renderCreationFormOneEntity(): HttpResponse;
    renderDetailsPageOneEntity(entity: Note): HttpResponse;
    renderMacroListOfNotes(notes: Note[]): string;
}
