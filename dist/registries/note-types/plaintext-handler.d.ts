import { FormBody } from "../../http/body-parser";
import { Note, RenderedNote } from "../../model/note-model";
import { NoteTypeHandler } from "../note-types-registry";
import { NotebookTableColumnsRegistry } from "../notebook-table-columns-registry";
interface PlaintextNoteHandlerProperties {
    notebookTableColumnsRegistry: NotebookTableColumnsRegistry;
}
export declare class PlaintextNoteHandler implements NoteTypeHandler {
    private properties;
    constructor(properties: PlaintextNoteHandlerProperties);
    typeName(): string;
    typeDisplayName(): string;
    isMatchForAutoType(content: string): boolean;
    render(note: Note): RenderedNote;
    renderEditForm(note: Note): string;
    mapRequestToExistingEntity(username: string, existingNote: Note, form: FormBody): Note;
    renderCreateForm(): string;
    mapRequestToNewEntity(username: string, form: FormBody): Note;
}
export {};
