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
        this.logger = this.noteControllerProperties.logger;
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
        this.logger.info("Checking user");
        const user = await this.noteControllerProperties.authenticator.authenticate(this.noteControllerProperties.authenticationToken);
        this.logger.info("Found user", { username: user.username });
        this.logger.info("Checking note");
        const note = await this.noteControllerProperties.noteStore.getOne(user.username, noteID);
        this.logger.info("Found note", { data: note });
        const attachments = await this.noteControllerProperties.noteAttachmentsStore.listAllForNote(user.username, note.id);
        this.logger.info("Found attachments", { data: attachments });
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
        this.logger.info("Checking user");
        const user = await this.noteControllerProperties.authenticator.authenticate(this.noteControllerProperties.authenticationToken);
        this.logger.info("Found user", { username: user.username });
        this.logger.info("Checking note");
        const note = await this.noteControllerProperties.noteStore.getOne(user.username, noteID);
        this.logger.info("Found note", { data: note });
        this.logger.info("Checking attachments");
        const noteAttachments = await this.noteControllerProperties.noteAttachmentsStore.listAllForNote(user.username, note.id);
        this.logger.info("Found attachments", { data: noteAttachments });
        this.logger.info("Checking noteAttachment");
        const noteAttachment = noteAttachments.find((a) => a.id === attachmentID);
        this.logger.info("Found noteAttachment", { data: noteAttachment });
        this.logger.info("Reading objectBody", {
            entityID: noteAttachment.objectKey,
        });
        const objectBody = await this.noteControllerProperties.attachmentsStore.read(noteAttachment.objectKey);
        this.logger.info("Got object body of length", {
            objectSize: objectBody.length,
        });
        return {
            isBase64Encoded: true,
            headers: {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": `attachment; filename="${noteAttachment.name}.${noteAttachment.fileExtension}"`,
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
            this.logger.info("[isAuthorizedToCreate] notebook not found. Access denied", { data: notebook });
            return false;
        }
        // if notebook is found, it means that user owns that notebook
        this.logger.info("[isAuthorizedToCreate] notebook found. Access granted", {
            data: notebook,
        });
        return true;
    }
    getEntityURL(note) {
        return `/notebook/${note.notebookID}`;
    }
}
exports.NoteController = NoteController;
//# sourceMappingURL=note-controller.js.map