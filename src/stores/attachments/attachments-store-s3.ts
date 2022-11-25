import { S3 } from "aws-sdk";
import { v4 } from "uuid";

import { Logger } from "../../logger/logger";
import { AttachmentsStore } from "./attachments-store";

interface AttachmentsStoreS3Properties {
  logger: Logger;
  s3: S3;
  bucketName: string;
  folderName: string;
}

export class AttachmentsStoreS3 implements AttachmentsStore {
  constructor(private properties: AttachmentsStoreS3Properties) {}
  public async persist(attachmentContent: string): Promise<string> {
    const fileKey = v4();
    const key = `${this.properties.folderName}/${fileKey}`;
    this.properties.logger.info("[AttachmentsStoreS3] calling putObject", {
      data: { bucketName: this.properties.bucketName },
      entityID: key,
    });
    const resp = await this.properties.s3
      .putObject({
        Bucket: this.properties.bucketName,
        Key: key,
        Body: attachmentContent,
      })
      .promise();
    this.properties.logger.info(
      "[AttachmentsStoreS3] finished calling putObject",
      { data: resp }
    );
    return fileKey;
  }
  public async read(fileKey: string): Promise<string> {
    this.properties.logger.info("Reading object", {
      data: {
        bucketName: this.properties.bucketName,
        folderName: this.properties.folderName,
        fileKey,
      },
    });
    const resp = await this.properties.s3
      .getObject({
        Bucket: this.properties.bucketName,
        Key: `${this.properties.folderName}/${fileKey}`,
      })
      .promise();
    this.properties.logger.info("Got S3 response", { data: resp });
    return resp.Body.toString();
  }
}
