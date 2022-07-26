import { NoteTypeHandler } from "../note-types-registry";
import { PlaintextNoteHandler } from "./plaintext-handler";
export declare class MarkdownHandler extends PlaintextNoteHandler implements NoteTypeHandler {
    typeName(): string;
    typeDisplayName(): string;
}
