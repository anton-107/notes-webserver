"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookController = void 0;
const short_uuid_1 = require("short-uuid");
const http_1 = require("../../http/http");
const entity_controller_1 = require("../entity-controller");
class NotebookController extends entity_controller_1.EntityController {
    constructor(notebookControllerProperties) {
        super(notebookControllerProperties);
        this.notebookControllerProperties = notebookControllerProperties;
    }
    getEntityName() {
        return "notebook";
    }
    mapRequestToEntityID(requestForm) {
        return requestForm["notebook-id"];
    }
    mapRequestToExistingEntity(username, notebook, form) {
        return {
            id: form["notebook-id"],
            name: form["notebook-name"],
            owner: username,
        };
    }
    mapRequestToNewEntity(username, form) {
        return {
            id: (0, short_uuid_1.generate)(),
            name: form["notebook-name"],
            owner: username,
        };
    }
    async isAuthorizedToCreate(user, entity) {
        console.log("everyone is authorized to create a notebook", entity, user);
        return true;
    }
    getEntityURL(entity) {
        console.log("notebook list is currently shown on home", entity);
        return "/home";
    }
    async showSingleEntityDetailsPage(entityID) {
        const response = await super.showSingleEntityDetailsPage(entityID);
        if (response.statusCode !== http_1.HttpStatus.OK) {
            return response;
        }
        const httpResponse = {
            ...response,
            body: response.body
                .replace("{{MACRO_LIST_NOTES}}", await this.showNotesInNotebook(this.authorizedUserName, entityID))
                .replace("{{MACRO_LIST_LINKS_TO_ADD_NOTES}}", await this.showLinksToAddNotes(entityID)),
        };
        console.log("notebook controller showSingleEntityDetailsPage", this.notebookControllerProperties.postProcessorRegistry);
        return await this.notebookControllerProperties.postProcessorRegistry.processResponse(this.authorizedUserName, httpResponse);
    }
    async showNotesInNotebook(owner, notebookID) {
        const notes = await this.notebookControllerProperties.noteStore.listAllInNotebook(owner, notebookID);
        return this.notebookControllerProperties.noteHtmlView.renderMacroListOfNotes(notes);
    }
    showLinksToAddNotes(notebookID) {
        const noteTypes = this.notebookControllerProperties.noteTypesRegistry.listNoteTypeHandlers();
        return this.notebookControllerProperties.noteHtmlView.renderMacroLinksToAddNotes(notebookID, noteTypes);
    }
}
exports.NotebookController = NotebookController;
//# sourceMappingURL=notebook-controller.js.map