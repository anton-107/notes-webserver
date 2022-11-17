import { NoteAttachment } from "../../model/note-model";
export interface NoteAttachmentsStore {
    add(attachment: NoteAttachment): Promise<void>;
    listAllForNote(owner: string, noteID: string): Promise<NoteAttachment[]>;
}
export declare class InMemoryNoteAttachmentsStore implements NoteAttachmentsStore {
    private items;
    add(attachment: NoteAttachment): Promise<void>;
    listAllForNote(owner: string, noteID: string): Promise<NoteAttachment[]>;
}
