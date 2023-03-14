import { FormBody } from "../../http/body-parser";
import { Note, RenderedNote } from "../../model/note-model";
import { NotebookTableColumn } from "../../model/notebook-model";
import { NoteTypeHandler } from "../note-types-registry";
export declare class NotesContainerHandler implements NoteTypeHandler {
    isMatchForAutoType(): boolean;
    typeName(): string;
    typeDisplayName(): string;
    render(note: Note): RenderedNote;
    renderCreateForm(): string;
    renderEditForm(note: Note): string;
    mapRequestToNewEntity(username: string, form: FormBody): Note;
    mapRequestToExistingEntity(username: string, existingNote: Note, form: FormBody): Note;
    listSupportedColumns(): NotebookTableColumn[];
}
