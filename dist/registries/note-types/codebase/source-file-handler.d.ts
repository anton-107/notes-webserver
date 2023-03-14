import { FormBody } from "../../../http/body-parser";
import { Note } from "../../../model/note-model";
import { NotebookTableColumn } from "../../../model/notebook-model";
import { NoteTypeHandler } from "../../note-types-registry";
import { PlaintextNoteHandler } from "../plaintext-handler";
export declare class SourceFileHandler extends PlaintextNoteHandler implements NoteTypeHandler {
    typeName(): string;
    typeDisplayName(): string;
    mapRequestToExistingEntity(username: string, existingNote: Note, form: FormBody): Note;
    mapRequestToNewEntity(username: string, form: FormBody): Note;
    listSupportedColumns(): NotebookTableColumn[];
}
