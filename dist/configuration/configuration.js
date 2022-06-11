"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dependenciesConfiguration = void 0;
const scrypt_hashing_1 = require("authentication-module/dist/scrypt-hashing");
const authenticator_1 = require("authentication-module/dist/authenticator");
const jwt_serializer_1 = require("authentication-module/dist/jwt-serializer");
const notebook_store_1 = require("../notebook-store");
class InMemoryUserStore {
    constructor() {
        this.users = [];
    }
    async getUserByName(username) {
        return this.users.find((u) => u.username === username);
    }
    async addUser(user) {
        this.users.push(user);
    }
}
const baseUrl = process.env["BASE_URL"] || "";
const passwordHashingFunction = new scrypt_hashing_1.ScryptHashingFunction();
const userStore = new InMemoryUserStore();
const jwtSerializerSecretKey = String(Math.random());
const notebookStore = new notebook_store_1.NotebookStore();
const dependenciesConfiguration = (overrides) => {
    return {
        userStore,
        authenticator: new authenticator_1.Authenticator({
            userStore,
            passwordHashingFunction,
            authTokensSerializer: new jwt_serializer_1.JWTSerializer(new jwt_serializer_1.StandardJwtImplementation(), jwtSerializerSecretKey),
        }),
        jwtSerializerSecretKey,
        passwordHashingFunction,
        notebookStore,
        baseUrl,
        ...overrides,
    };
};
exports.dependenciesConfiguration = dependenciesConfiguration;
//# sourceMappingURL=configuration.js.map