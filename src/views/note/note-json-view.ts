import { EntityView } from "../../controller/entity-controller";
import { Note } from "../../model/note-model";
import { NoteHtmlView } from "./note-html-view";

export class NoteJsonView extends NoteHtmlView implements EntityView<Note> {}
