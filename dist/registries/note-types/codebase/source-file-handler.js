"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileHandler = void 0;
const plaintext_handler_1 = require("../plaintext-handler");
class SourceFileHandler extends plaintext_handler_1.PlaintextNoteHandler {
    typeName() {
        return "source-file";
    }
    typeDisplayName() {
        return "Source file";
    }
    mapRequestToExistingEntity(username, existingNote, form) {
        const note = super.mapRequestToExistingEntity(username, existingNote, form);
        if (!note.extensionProperties) {
            note.extensionProperties = {};
        }
        note.extensionProperties.numberOfLines = form["number-of-lines"];
        note.extensionProperties.numberOfChanges = form["number-of-changes"];
        note.extensionProperties.numberOfContributors =
            form["number-of-contributors"];
        return note;
    }
    mapRequestToNewEntity(username, form) {
        const note = super.mapRequestToNewEntity(username, form);
        note.extensionProperties.numberOfLines = form["number-of-lines"];
        note.extensionProperties.numberOfChanges = form["number-of-changes"];
        note.extensionProperties.numberOfContributors =
            form["number-of-contributors"];
        return note;
    }
}
exports.SourceFileHandler = SourceFileHandler;
//# sourceMappingURL=source-file-handler.js.map