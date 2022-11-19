export interface AttachmentsStore {
  persist(attachmentContent: string): Promise<string>;
  read(objectKey: string): Promise<string>;
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
  public async read(objectKey: string): Promise<string> {
    return this.attachments[Number(objectKey)];
  }
}
