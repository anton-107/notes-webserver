"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPersonStore = void 0;
class InMemoryPersonStore {
    constructor() {
        this.items = [];
    }
    async add(person) {
        this.items.push(person);
    }
    async listAll(owner) {
        return this.items.filter((x) => x.manager === owner);
    }
    async getOne(owner, id) {
        return this.items.find((x) => x.manager === owner && x.id === id);
    }
    async editOne(person) {
        const item = this.items.find((x) => x.manager === person.manager && x.id === person.id);
        if (!item) {
            throw Error("Person is not found");
        }
        item.name = person.name;
        item.email = person.email;
    }
    async deleteOne(owner, id) {
        const index = this.items.findIndex((x) => x.manager === owner && x.id === id);
        if (index < 0) {
            throw Error("Person is not found");
        }
        this.items.splice(index, 1);
    }
}
exports.InMemoryPersonStore = InMemoryPersonStore;
//# sourceMappingURL=person-store.js.map