"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAttachmentsStore = void 0;
class InMemoryAttachmentsStore {
    constructor(properties) {
        this.properties = properties;
        this.attachments = [];
    }
    async persist(attachmentContent) {
        const index = this.attachments.length;
        this.attachments.push(attachmentContent);
        this.properties.logger.info("InMemoryAttachmentsStore: saved attachment of size", { objectSize: attachmentContent.length });
        return String(index);
    }
    async read(objectKey) {
        return this.attachments[Number(objectKey)];
    }
}
exports.InMemoryAttachmentsStore = InMemoryAttachmentsStore;
//# sourceMappingURL=attachments-store.js.map