import { Note, RenderedNote } from "notes-model/dist/note-model";
import { NotebookTableColumn } from "notes-model/dist/notebook-model";
import { FormBody } from "../../http/body-parser";
import { NoteTypeHandler } from "../note-types-registry";
export declare class DateRangeNoteHandler implements NoteTypeHandler {
    isMatchForAutoType(): boolean;
    typeName(): string;
    typeDisplayName(): string;
    mapRequestToNewEntity(username: string, form: FormBody): Note;
    mapRequestToExistingEntity(username: string, existingNote: Note, form: FormBody): Note;
    render(note: Note): RenderedNote;
    protected htmlView(note: Note): string;
    renderCreateForm(): string;
    renderEditForm(note: Note): string;
    listSupportedColumns(): NotebookTableColumn[];
}
