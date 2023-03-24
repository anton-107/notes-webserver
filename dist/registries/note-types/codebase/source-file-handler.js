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
        this.populateExtensionPropertiesFromForm(note.extensionProperties, form);
        return note;
    }
    mapRequestToNewEntity(username, form) {
        const note = super.mapRequestToNewEntity(username, form);
        this.populateExtensionPropertiesFromForm(note.extensionProperties, form);
        return note;
    }
    listSupportedColumns() {
        return [
            {
                name: "Number of lines",
                columnType: "numberOfLines",
                valueType: "number",
                valueSource: "extensionProperties",
            },
            {
                name: "Number of changes",
                columnType: "numberOfChanges",
                valueType: "number",
                valueSource: "extensionProperties",
            },
            {
                name: "Number of contributors",
                columnType: "numberOfContributors",
                valueType: "number",
                valueSource: "extensionProperties",
            },
            {
                name: "Contributors",
                columnType: "contributors",
                valueType: "list-of-objects",
                valueSource: "extensionProperties",
            },
        ];
    }
    populateExtensionPropertiesFromForm(extensionProperties, form) {
        extensionProperties.numberOfLines = form["number-of-lines"];
        extensionProperties.numberOfChanges = form["number-of-changes"];
        extensionProperties.numberOfContributors = form["number-of-contributors"];
        if ("contributors" in form) {
            const contributors = JSON.parse(form["contributors"]);
            extensionProperties.contributors = contributors.map((c) => {
                return {
                    name: String(c.name),
                    numberOfChanges: parseInt(String(c.numberOfChanges)),
                    firstChangeTimestamp: parseInt(String(c.firstChangeTimestamp)),
                    lastChangeTimestamp: parseInt(String(c.lastChangeTimestamp)),
                };
            });
        }
    }
}
exports.SourceFileHandler = SourceFileHandler;
//# sourceMappingURL=source-file-handler.js.map