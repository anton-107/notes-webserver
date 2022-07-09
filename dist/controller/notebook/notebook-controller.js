"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookController = void 0;
const short_uuid_1 = require("short-uuid");
const entity_controller_1 = require("../entity-controller");
class NotebookController extends entity_controller_1.EntityController {
    getEntityName() {
        return "notebook";
    }
    mapRequestToExistingEntity(username, form) {
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
}
exports.NotebookController = NotebookController;
//# sourceMappingURL=notebook-controller.js.map