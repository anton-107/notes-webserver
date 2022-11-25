"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaintextNoteHandler = void 0;
const short_uuid_1 = require("short-uuid");
class PlaintextNoteHandler {
    constructor(properties) {
        this.properties = properties;
    }
    typeName() {
        return "note";
    }
    typeDisplayName() {
        return "plain note";
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isMatchForAutoType(content) {
        return false;
    }
    render(note) {
        return {
            ...note,
            renderedContent: `<div data-testid='note-content'>${note.content}</div>`,
        };
    }
    renderEditForm(note) {
        return `<textarea name='note-content' data-testid='note-content-input'>${note.content}</textarea>`;
    }
    mapRequestToExistingEntity(username, existingNote, form) {
        const r = { ...existingNote };
        if ("note-content" in form) {
            r.content = form["note-content"];
        }
        if ("note-section" in form) {
            if (!r.extensionProperties) {
                r.extensionProperties = {};
            }
            r.extensionProperties.section = form["note-section"];
        }
        if ("note-manual-order" in form) {
            if (!r.extensionProperties) {
                r.extensionProperties = {};
            }
            r.extensionProperties.manualOrder = form["note-manual-order"];
        }
        if ("table-columns" in form) {
            if (!r.columnValues) {
                r.columnValues = {};
            }
            const supportedColumns = this.properties.notebookTableColumnsRegistry.listColumns();
            const requestedColumns = form["table-columns"];
            supportedColumns.forEach((c) => {
                if (requestedColumns[c.columnType]) {
                    r.columnValues[c.columnType] = requestedColumns[c.columnType];
                }
            });
        }
        return r;
    }
    renderCreateForm() {
        return `<textarea name='note-content' data-testid='note-content-input'></textarea>`;
    }
    mapRequestToNewEntity(username, form) {
        return {
            id: (0, short_uuid_1.generate)(),
            notebookID: form["notebook-id"],
            owner: username,
            type: { type: this.typeName() },
            content: form["note-content"],
            extensionProperties: {
                section: form["note-section"],
                manualOrder: form["note-manual-order"],
            },
        };
    }
}
exports.PlaintextNoteHandler = PlaintextNoteHandler;
//# sourceMappingURL=plaintext-handler.js.map