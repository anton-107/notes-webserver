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
        console.log("[AttachmentsStoreS3] calling putObject", this.properties.bucketName, key);
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
    async read(fileKey) {
        console.log("Reading object", this.properties.bucketName, this.properties.folderName, fileKey);
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
exports.AttachmentsStoreS3 = AttachmentsStoreS3;
//# sourceMappingURL=attachments-store-s3.js.map