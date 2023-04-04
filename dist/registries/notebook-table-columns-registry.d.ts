import { NotebookTableColumn } from "notes-model/dist/notebook-model";
import { NoteTypesRegistry } from "./note-types-registry";
export declare class NotebookTableColumnsRegistry {
    private columns;
    addColumn(column: NotebookTableColumn): void;
    addColumnsFromNoteTypesRegistry(registry: NoteTypesRegistry): void;
    listColumns(): NotebookTableColumn[];
}
