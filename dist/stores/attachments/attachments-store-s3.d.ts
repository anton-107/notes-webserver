import { S3 } from "aws-sdk";
import { Logger } from "../../logger/logger";
import { AttachmentsStore } from "./attachments-store";
interface AttachmentsStoreS3Properties {
    logger: Logger;
    s3: S3;
    bucketName: string;
    folderName: string;
}
export declare class AttachmentsStoreS3 implements AttachmentsStore {
    private properties;
    constructor(properties: AttachmentsStoreS3Properties);
    persist(attachmentContent: string): Promise<string>;
    read(fileKey: string): Promise<string>;
}
export {};
