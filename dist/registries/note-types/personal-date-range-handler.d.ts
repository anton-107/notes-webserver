import { Note, RenderedNote } from "notes-model/dist/note-model";
import { FormBody } from "../../http/body-parser";
import { NoteTypeHandler } from "../note-types-registry";
import { DateRangeNoteHandler } from "./date-range-handler";
export declare class PersonalDateRangeNoteHandler extends DateRangeNoteHandler implements NoteTypeHandler {
    isMatchForAutoType(): boolean;
    typeName(): string;
    typeDisplayName(): string;
    mapRequestToNewEntity(username: string, form: FormBody): Note;
    mapRequestToExistingEntity(username: string, existingNote: Note, form: FormBody): Note;
    render(note: Note): RenderedNote;
    protected htmlView(note: Note): string;
    renderCreateForm(): string;
    renderEditForm(note: Note): string;
}
