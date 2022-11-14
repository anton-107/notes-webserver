import { S3 } from "aws-sdk";
import { AttachmentsStore } from "./attachments-store";
import { v4 } from "uuid";

interface AttachmentsStoreS3Properties {
  s3: S3;
  bucketName: string;
  folderName: string;
}

export class AttachmentsStoreS3 implements AttachmentsStore {
  constructor(private properties: AttachmentsStoreS3Properties) {}

  public async persist(attachmentContent: string): Promise<string> {
    const fileKey = v4();
    const key = `${this.properties.folderName}/${fileKey}`;
    await this.properties.s3.putObject({
      Bucket: this.properties.bucketName,
      Key: key,
      Body: attachmentContent,
    });
    return fileKey;
  }
}
