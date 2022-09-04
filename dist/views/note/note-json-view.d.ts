import { EntityView } from "../../controller/entity-controller";
import { HttpResponse } from "../../http/http";
import { Note } from "../../model/note-model";
import { NoteHtmlView } from "./note-html-view";
export declare class NoteJsonView extends NoteHtmlView implements EntityView<Note> {
    renderDetailsPageOneEntity(entity: Note): HttpResponse;
}
