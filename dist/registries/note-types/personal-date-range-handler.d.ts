import { FormBody } from "../../http/body-parser";
import { Note, RenderedNote } from "../../model/note-model";
import { NoteTypeHandler } from "../note-types-registry";
export declare class PersonalDateRangeNoteHandler implements NoteTypeHandler {
    typeName(): string;
    typeDisplayName(): string;
    mapRequestToNewEntity(username: string, form: FormBody): Note;
    mapRequestToExistingEntity(username: string, existingNote: Note, form: FormBody): Note;
    render(note: Note): RenderedNote;
    private htmlView;
    renderCreateForm(): string;
    renderEditForm(note: Note): string;
}
