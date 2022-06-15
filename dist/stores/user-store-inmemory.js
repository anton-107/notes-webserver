"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserStore = void 0;
class InMemoryUserStore {
    constructor() {
        this.users = [];
    }
    async getUserByName(username) {
        console.log(`[InMemoryUserStore] fetching up user ${username}`);
        return this.users.find((u) => u.username === username);
    }
    async addUser(user) {
        this.users.push(user);
    }
}
exports.InMemoryUserStore = InMemoryUserStore;
//# sourceMappingURL=user-store-inmemory.js.map