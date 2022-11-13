export interface AttachmentsStore {
    persist(attachmentContent: string): Promise<string>;
}
export declare class InMemoryAttachmentsStore implements AttachmentsStore {
    private attachments;
    persist(attachmentContent: string): Promise<string>;
}
