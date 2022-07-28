import { FormBody } from "../http/body-parser";
import { Note, RenderedNote } from "../model/note-model";
export interface NoteTypeHandler {
    typeName(): string;
    typeDisplayName(): string;
    render(note: Note): RenderedNote;
    renderCreateForm(): string;
    renderEditForm(note: Note): string;
    mapRequestToNewEntity(username: string, form: FormBody): Note;
    mapRequestToExistingEntity(username: string, existingNote: Note, form: FormBody): Note;
}
export declare class NoteTypesRegistry {
    private handlers;
    addNoteTypeHandler(handler: NoteTypeHandler): void;
    listNoteTypeHandlers(): NoteTypeHandler[];
    getNoteTypeHandler(noteTypeName: string): NoteTypeHandler | null;
}
