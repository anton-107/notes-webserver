import { FormBody } from "../../http/body-parser";
import { Note, RenderedNote } from "../../model/note-model";
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
