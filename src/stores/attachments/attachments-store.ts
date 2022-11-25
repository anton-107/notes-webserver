import { Logger } from "../../logger/logger";

export interface AttachmentsStore {
  persist(attachmentContent: string): Promise<string>;
  read(objectKey: string): Promise<string>;
}

interface InMemoryAttachmentsStoreProperties {
  logger: Logger;
}

export class InMemoryAttachmentsStore implements AttachmentsStore {
  constructor(private properties: InMemoryAttachmentsStoreProperties) {}
  private attachments: string[] = [];
  public async persist(attachmentContent: string): Promise<string> {
    const index = this.attachments.length;
    this.attachments.push(attachmentContent);
    this.properties.logger.info(
      "InMemoryAttachmentsStore: saved attachment of size",
      { objectSize: attachmentContent.length }
    );
    return String(index);
  }
  public async read(objectKey: string): Promise<string> {
    return this.attachments[Number(objectKey)];
  }
}
