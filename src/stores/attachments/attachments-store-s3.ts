import { S3 } from "aws-sdk";
import { v4 } from "uuid";

import { AttachmentsStore } from "./attachments-store";

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
    console.log(
      "[AttachmentsStoreS3] calling putObject",
      this.properties.bucketName,
      key
    );
    const resp = await this.properties.s3
      .putObject({
        Bucket: this.properties.bucketName,
        Key: key,
        Body: attachmentContent,
      })
      .promise();
    console.log("[AttachmentsStoreS3] finished calling putObject", resp);
    return fileKey;
  }
  public async read(fileKey: string): Promise<string> {
    console.log(
      "Reading object",
      this.properties.bucketName,
      this.properties.folderName,
      fileKey
    );
    const resp = await this.properties.s3
      .getObject({
        Bucket: this.properties.bucketName,
        Key: `${this.properties.folderName}/${fileKey}`,
      })
      .promise();
    console.log("Got S3 response", resp);
    return resp.Body.toString();
  }
}
