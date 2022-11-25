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
        this.logger = this.notebookControllerProperties.logger;
    }
    async listSupportedColumns() {
        const columns = this.notebookControllerProperties.notebookTableColumnsRegistry.listColumns();
        return this.notebookControllerProperties.notebookJsonView.renderSupportedTableColumns(columns);
    }
    getEntityName() {
        return "notebook";
    }
    mapRequestToEntityID(requestForm) {
        return requestForm["notebook-id"];
    }
    mapRequestToExistingEntity(username, existingNotebook, form) {
        let isUpdated = false;
        const r = { ...existingNotebook };
        if (form["notebook-name"]) {
            r.name = form["notebook-name"];
            isUpdated = true;
        }
        if (form["table-columns"]) {
            const supportedColumns = this.notebookControllerProperties.notebookTableColumnsRegistry.listColumns();
            r.tableColumns = [];
            form["table-columns"].forEach((x) => {
                const column = supportedColumns.find((c) => x["column-type"] === c.columnType);
                if (column) {
                    r.tableColumns.push(column);
                    isUpdated = true;
                }
            });
        }
        if (isUpdated) {
            r.updatedAt = new Date().toISOString();
        }
        return r;
    }
    mapRequestToNewEntity(username, form) {
        const now = new Date().toISOString();
        return {
            id: (0, short_uuid_1.generate)(),
            name: form["notebook-name"],
            owner: username,
            sections: [],
            tableColumns: [],
            createdAt: now,
            updatedAt: now,
        };
    }
    async isAuthorizedToCreate(user, entity) {
        this.logger.info("everyone is authorized to create a notebook", {
            username: user,
            data: entity,
        });
        return true;
    }
    getEntityURL(entity) {
        this.logger.info("notebook list is currently shown on home", {
            data: entity,
        });
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