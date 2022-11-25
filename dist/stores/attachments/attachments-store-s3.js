"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsStoreS3 = void 0;
const uuid_1 = require("uuid");
class AttachmentsStoreS3 {
    constructor(properties) {
        this.properties = properties;
    }
    async persist(attachmentContent) {
        const fileKey = (0, uuid_1.v4)();
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
        this.properties.logger.info("[AttachmentsStoreS3] finished calling putObject", { data: resp });
        return fileKey;
    }
    async read(fileKey) {
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
exports.AttachmentsStoreS3 = AttachmentsStoreS3;
//# sourceMappingURL=attachments-store-s3.js.map