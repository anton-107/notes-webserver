import { FormBody } from "../../../http/body-parser";
import { Note, NoteExtensionProperties } from "../../../model/note-model";
import { NotebookTableColumn } from "../../../model/notebook-model";
import { NoteTypeHandler } from "../../note-types-registry";
import { PlaintextNoteHandler } from "../plaintext-handler";
interface Contributor {
    name: string;
    numberOfChanges: number;
    firstChangeTimestamp: number;
    lastChangeTimestamp: number;
}
export type SourceFileHandlerExtensionProperties = NoteExtensionProperties & {
    contributors?: Contributor[];
};
export declare class SourceFileHandler extends PlaintextNoteHandler implements NoteTypeHandler {
    typeName(): string;
    typeDisplayName(): string;
    mapRequestToExistingEntity(username: string, existingNote: Note, form: FormBody): Note;
    mapRequestToNewEntity(username: string, form: FormBody): Note;
    listSupportedColumns(): NotebookTableColumn[];
    private populateExtensionPropertiesFromForm;
}
export {};
