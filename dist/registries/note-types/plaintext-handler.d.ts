import { Note, RenderedNote } from "notes-model/dist/note-model";
import { NotebookTableColumn } from "notes-model/dist/notebook-model";
import { FormBody } from "../../http/body-parser";
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
    listSupportedColumns(): NotebookTableColumn[];
}
export {};
