import { Logger } from "../../logger/logger";
export interface AttachmentsStore {
    persist(attachmentContent: string): Promise<string>;
    read(objectKey: string): Promise<string>;
}
interface InMemoryAttachmentsStoreProperties {
    logger: Logger;
}
export declare class InMemoryAttachmentsStore implements AttachmentsStore {
    private properties;
    constructor(properties: InMemoryAttachmentsStoreProperties);
    private attachments;
    persist(attachmentContent: string): Promise<string>;
    read(objectKey: string): Promise<string>;
}
export {};
