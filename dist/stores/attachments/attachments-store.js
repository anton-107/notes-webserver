"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAttachmentsStore = void 0;
class InMemoryAttachmentsStore {
    constructor() {
        this.attachments = [];
    }
    async persist(attachmentContent) {
        const index = this.attachments.length;
        this.attachments.push(attachmentContent);
        console.log("InMemoryAttachmentsStore: saved attachment of size", attachmentContent.length);
        return String(index);
    }
}
exports.InMemoryAttachmentsStore = InMemoryAttachmentsStore;
//# sourceMappingURL=attachments-store.js.map