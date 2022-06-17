"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonConfiguration = void 0;
const user_store_inmemory_1 = require("../stores/user-store-inmemory");
const jwt_serializer_1 = require("authentication-module/dist/jwt-serializer");
const scrypt_hashing_1 = require("authentication-module/dist/scrypt-hashing");
const authenticator_1 = require("authentication-module/dist/authenticator");
const notebook_store_1 = require("../notebook-store");
const passwordHashingFunction = new scrypt_hashing_1.ScryptHashingFunction();
const userStore = new user_store_inmemory_1.InMemoryUserStore();
const jwtSerializerSecretKey = String(Math.random());
const notebookStore = new notebook_store_1.NotebookStore();
const commonConfiguration = (overrides) => {
    return {
        userStore,
        authenticator: new authenticator_1.Authenticator({
            userStore: overrides.userStore || userStore,
            passwordHashingFunction,
            authTokensSerializer: new jwt_serializer_1.JWTSerializer(new jwt_serializer_1.StandardJwtImplementation(), jwtSerializerSecretKey),
        }),
        passwordHashingFunction,
        notebookStore,
        baseUrl: "",
        ...overrides,
    };
};
exports.commonConfiguration = commonConfiguration;
//# sourceMappingURL=common.js.map