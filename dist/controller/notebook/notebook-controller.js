"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookController = void 0;
const entity_controller_1 = require("../entity-controller");
class NotebookController extends entity_controller_1.EntityController {
    getEntityName() {
        return "notebook";
    }
    mapRequestToEntity(username, form) {
        return {
            id: form["notebook-id"],
            name: form["notebook-name"],
            owner: username,
        };
    }
}
exports.NotebookController = NotebookController;
//# sourceMappingURL=notebook-controller.js.map