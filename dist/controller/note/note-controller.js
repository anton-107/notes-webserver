"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const short_uuid_1 = require("short-uuid");
const entity_controller_1 = require("../entity-controller");
class NoteController extends entity_controller_1.EntityController {
    constructor(noteControllerProperties) {
        super(noteControllerProperties);
        this.noteControllerProperties = noteControllerProperties;
    }
    getEntityName() {
        return "note";
    }
    mapRequestToEntityID(requestForm) {
        return requestForm["note-id"];
    }
    mapRequestToExistingEntity(username, existingNote, form) {
        const noteTypeHandler = this.noteControllerProperties.noteTypesRegistry.getNoteTypeHandler(existingNote.type.type);
        if (noteTypeHandler) {
            return noteTypeHandler.mapRequestToExistingEntity(username, existingNote, form);
        }
        const r = { ...existingNote };
        r.content = form["note-content"];
        return r;
    }
    mapRequestToNewEntity(username, form) {
        return {
            id: (0, short_uuid_1.generate)(),
            notebook: { id: form["notebook-id"], name: "", owner: "" },
            owner: username,
            type: { type: "" },
            content: form["note-content"],
        };
    }
    async isAuthorizedToCreate(user, entity) {
        const notebook = await this.noteControllerProperties.notebookStore.getOne(user, entity.notebook.id);
        if (!notebook) {
            console.log("[isAuthorizedToCreate] notebook not found. Access denied", notebook);
            return false;
        }
        // if notebook is found, it means that user owns that notebook
        console.log("[isAuthorizedToCreate] notebook found. Access granted", notebook);
        return true;
    }
    getEntityURL(note) {
        return `/notebook/${note.notebook.id}`;
    }
}
exports.NoteController = NoteController;
//# sourceMappingURL=note-controller.js.map