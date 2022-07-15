import { Note, RenderedNote } from "../../model/note-model";
import { NoteTypeHandler } from "../note-types-registry";
export declare class MarkdownHandler implements NoteTypeHandler {
    typeName(): string;
    typeDisplayName(): string;
    render(note: Note): RenderedNote;
}