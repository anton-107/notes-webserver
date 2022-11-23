"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const short_uuid_1 = require("short-uuid");
const http_1 = require("../../http/http");
const entity_controller_1 = require("../entity-controller");
class NoteController extends entity_controller_1.EntityController {
    constructor(noteControllerProperties) {
        super(noteControllerProperties);
        this.noteControllerProperties = noteControllerProperties;
    }
    async showCreateNewEntityPage() {
        const user = await this.noteControllerProperties.authenticator.authenticate(this.noteControllerProperties.authenticationToken);
        const createNewEntityResponse = this.noteControllerProperties.entityView.renderCreationFormOneEntity({
            type: { type: this.noteControllerProperties.noteType },
        });
        return await this.noteControllerProperties.postProcessorRegistry.processResponse(user.username, createNewEntityResponse);
    }
    async showNotesInNotebook(notebookID) {
        const user = await this.noteControllerProperties.authenticator.authenticate(this.noteControllerProperties.authenticationToken);
        const notes = await this.noteControllerProperties.noteStore.listAllInNotebook(user.username, notebookID);
        return this.noteControllerProperties.entityView.renderListPageAllEntities(notes);
    }
    async listAttachments(noteID) {
        console.log("Checking user");
        const user = await this.noteControllerProperties.authenticator.authenticate(this.noteControllerProperties.authenticationToken);
        console.log("Found user", user);
        console.log("Checking note");
        const note = await this.noteControllerProperties.noteStore.getOne(user.username, noteID);
        console.log("Found note", note);
        const attachments = await this.noteControllerProperties.noteAttachmentsStore.listAllForNote(user.username, note.id);
        console.log("Found attachments", attachments);
        return {
            isBase64Encoded: false,
            headers: {
                "Content-Type": "application/json",
                ...this.noteControllerProperties.corsHeaders,
            },
            body: JSON.stringify({ attachments }),
            statusCode: http_1.HttpStatus.OK,
        };
    }
    async downloadAttachment(noteID, attachmentID) {
        console.log("Checking user");
        const user = await this.noteControllerProperties.authenticator.authenticate(this.noteControllerProperties.authenticationToken);
        console.log("Found user", user);
        console.log("Checking note");
        const note = await this.noteControllerProperties.noteStore.getOne(user.username, noteID);
        console.log("Found note", note);
        console.log("Checking attachments");
        const noteAttachments = await this.noteControllerProperties.noteAttachmentsStore.listAllForNote(user.username, note.id);
        console.log("Found attachments", noteAttachments);
        console.log("Checking noteAttachment");
        const noteAttachment = noteAttachments.find((a) => a.id === attachmentID);
        console.log("Found noteAttachment", noteAttachment);
        console.log("Reading objectBody", noteAttachment.objectKey);
        const objectBody = await this.noteControllerProperties.attachmentsStore.read(noteAttachment.objectKey);
        console.log("Got object body of length", objectBody.length);
        return {
            isBase64Encoded: true,
            headers: {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": `attachment; filename="${noteAttachment.name}.${noteAttachment.fileExtension}"`
            },
            body: objectBody,
            statusCode: http_1.HttpStatus.OK,
        };
    }
    getEntityName() {
        return "note";
    }
    mapRequestToEntityID(requestForm) {
        return requestForm["note-id"];
    }
    mapRequestToExistingEntity(username, existingNote, form) {
        const noteTypeHandler = this.noteControllerProperties.noteTypesRegistry.getNoteTypeHandler(existingNote.type.type);
        return noteTypeHandler.mapRequestToExistingEntity(username, existingNote, form);
    }
    mapRequestToNewEntity(username, form) {
        let noteType = form["note-type"];
        if (noteType === "note") {
            const autoType = this.noteControllerProperties.noteTypesRegistry.getAutoType(form["note-content"]);
            if (autoType) {
                noteType = autoType;
            }
        }
        const noteTypeHandler = this.noteControllerProperties.noteTypesRegistry.getNoteTypeHandler(noteType);
        if (noteTypeHandler) {
            return noteTypeHandler.mapRequestToNewEntity(username, form);
        }
        return {
            id: (0, short_uuid_1.generate)(),
            notebookID: form["notebook-id"],
            owner: username,
            type: { type: "note" },
            content: form["note-content"],
        };
    }
    async isAuthorizedToCreate(user, entity) {
        const notebook = await this.noteControllerProperties.notebookStore.getOne(user, entity.notebookID);
        if (!notebook) {
            console.log("[isAuthorizedToCreate] notebook not found. Access denied", notebook);
            return false;
        }
        // if notebook is found, it means that user owns that notebook
        console.log("[isAuthorizedToCreate] notebook found. Access granted", notebook);
        return true;
    }
    getEntityURL(note) {
        return `/notebook/${note.notebookID}`;
    }
}
exports.NoteController = NoteController;
//# sourceMappingURL=note-controller.js.map