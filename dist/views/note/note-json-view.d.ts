import { Note } from "notes-model/dist/note-model";
import { HttpResponse } from "../../http/http";
import { EntityView } from "../entity-view";
import { NoteHtmlView } from "./note-html-view";
export declare class NoteJsonView extends NoteHtmlView implements EntityView<Note> {
    renderDetailsPageOneEntity(entity: Note): HttpResponse;
}
