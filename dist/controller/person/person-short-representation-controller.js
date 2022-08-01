"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonShortRepresentationController = void 0;
class PersonShortRepresentationController {
    constructor(properties) {
        this.properties = properties;
        this.personListCache = {};
    }
    getRegularExpressionForMacro() {
        return /{{MACRO_PERSON_SHORT_REPRESENTATION:?([A-z0-9]+)?}}/;
    }
    async renderMacro(username, match) {
        const selectedPersonID = match[1] || "";
        const people = await this.getListOfPeople(username);
        const person = people.find((x) => x.id === selectedPersonID);
        return `<div data-testid='person-name'>${person ? person.name : `[unknown person ${selectedPersonID}]`}</div>`;
    }
    async getListOfPeople(username) {
        if (this.personListCache[username]) {
            return this.personListCache[username];
        }
        const people = await this.properties.personStore.listAll(username);
        this.personListCache[username] = people;
        return people;
    }
}
exports.PersonShortRepresentationController = PersonShortRepresentationController;
//# sourceMappingURL=person-short-representation-controller.js.map