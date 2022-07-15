"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonController = void 0;
const short_uuid_1 = require("short-uuid");
const entity_controller_1 = require("../entity-controller");
class PersonController extends entity_controller_1.EntityController {
    getEntityName() {
        return "person";
    }
    mapRequestToExistingEntity(username, form) {
        return {
            id: form["person-id"],
            name: form["person-name"],
            email: form["person-email"],
            manager: username,
        };
    }
    mapRequestToNewEntity(username, form) {
        return {
            id: (0, short_uuid_1.generate)(),
            name: form["person-name"],
            email: form["person-email"],
            manager: username,
        };
    }
    async isAuthorizedToCreate(user, entity) {
        console.log("everyone is authorized to add a person", entity, user);
        return true;
    }
    getEntityURL(entity) {
        console.log("list of people is currently shown on home", entity);
        return "/home";
    }
}
exports.PersonController = PersonController;
//# sourceMappingURL=person-controller.js.map