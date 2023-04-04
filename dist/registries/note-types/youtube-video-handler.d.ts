import { Note, RenderedNote } from "notes-model/dist/note-model";
import { FormBody } from "../../http/body-parser";
import { NoteTypeHandler } from "../note-types-registry";
import { PlaintextNoteHandler } from "./plaintext-handler";
export declare class YoutubeVideoHandler extends PlaintextNoteHandler implements NoteTypeHandler {
    isMatchForAutoType(content: string): boolean;
    typeName(): string;
    typeDisplayName(): string;
    render(note: Note): RenderedNote;
    renderCreateForm(): string;
    renderEditForm(note: Note): string;
    mapRequestToNewEntity(username: string, form: FormBody): Note;
}
