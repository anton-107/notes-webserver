import { Note } from "notes-model/dist/note-model";
import { NotebookTableColumn } from "notes-model/dist/notebook-model";
import { FormBody } from "../../../http/body-parser";
import { NoteTypeHandler } from "../../note-types-registry";
import { PlaintextNoteHandler } from "../plaintext-handler";
export declare class SourceFileHandler extends PlaintextNoteHandler implements NoteTypeHandler {
    typeName(): string;
    typeDisplayName(): string;
    mapRequestToExistingEntity(username: string, existingNote: Note, form: FormBody): Note;
    mapRequestToNewEntity(username: string, form: FormBody): Note;
    listSupportedColumns(): NotebookTableColumn[];
    private populateExtensionPropertiesFromForm;
}
