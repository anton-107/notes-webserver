import { Note, RenderedNote } from "../model/note-model";
export interface NoteTypeHandler {
    typeName(): string;
    typeDisplayName(): string;
    render(note: Note): RenderedNote;
    renderEditForm(note: Note): string;
}
export declare class NoteTypesRegistry {
    private handlers;
    addNoteTypeHandler(handler: NoteTypeHandler): void;
    listNoteTypeHandlers(): NoteTypeHandler[];
    getNoteTypeHandler(noteTypeName: string): NoteTypeHandler | null;
}
