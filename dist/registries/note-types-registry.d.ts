import { Note, RenderedNote } from "notes-model/dist/note-model";
import { NotebookTableColumn } from "notes-model/dist/notebook-model";
import { FormBody } from "../http/body-parser";
export interface NoteTypeHandler {
    typeName(): string;
    typeDisplayName(): string;
    render(note: Note): RenderedNote;
    renderCreateForm(): string;
    renderEditForm(note: Note): string;
    mapRequestToNewEntity(username: string, form: FormBody): Note;
    mapRequestToExistingEntity(username: string, existingNote: Note, form: FormBody): Note;
    isMatchForAutoType(content: string): boolean;
    listSupportedColumns(): NotebookTableColumn[];
}
export declare class NoteTypesRegistry {
    private handlers;
    addNoteTypeHandler(handler: NoteTypeHandler): void;
    listNoteTypeHandlers(): NoteTypeHandler[];
    getNoteTypeHandler(noteTypeName: string): NoteTypeHandler | null;
    getAutoType(content: string): string | null;
}
