export interface AttachmentsStore {
  persist(attachmentContent: string): Promise<string>;
}

export class InMemoryAttachmentsStore implements AttachmentsStore {
  private attachments: string[] = [];
  public async persist(attachmentContent: string): Promise<string> {
    const index = this.attachments.length;
    this.attachments.push(attachmentContent);
    console.log(
      "InMemoryAttachmentsStore: saved attachment of size",
      attachmentContent.length
    );
    return String(index);
  }
}
