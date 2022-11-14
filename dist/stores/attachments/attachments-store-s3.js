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
        await this.properties.s3.putObject({
            Bucket: this.properties.bucketName,
            Key: key,
            Body: attachmentContent,
        });
        return fileKey;
    }
}
exports.AttachmentsStoreS3 = AttachmentsStoreS3;
//# sourceMappingURL=attachments-store-s3.js.map