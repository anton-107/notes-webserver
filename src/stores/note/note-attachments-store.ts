import { NoteAttachment } from "../../model/note-model";

export interface NoteAttachmentsStore {
  add(attachment: NoteAttachment): Promise<void>;
  listAllForNote(owner: string, noteID: string): Promise<NoteAttachment[]>;
}

export class InMemoryNoteAttachmentsStore implements NoteAttachmentsStore {
  private items: NoteAttachment[] = [];
  public async add(attachment: NoteAttachment): Promise<void> {
    this.items.push(attachment);
  }
  public async listAllForNote(
    owner: string,
    noteID: string
  ): Promise<NoteAttachment[]> {
    return this.items.filter((x) => x.owner === owner && x.noteID === noteID);
  }
}
