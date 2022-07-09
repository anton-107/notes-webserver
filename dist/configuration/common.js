"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonConfiguration = void 0;
const user_store_inmemory_1 = require("../stores/user/user-store-inmemory");
const jwt_serializer_1 = require("authentication-module/dist/jwt-serializer");
const scrypt_hashing_1 = require("authentication-module/dist/scrypt-hashing");
const authenticator_1 = require("authentication-module/dist/authenticator");
const notebook_store_1 = require("../stores/notebook/notebook-store");
const passwordHashingFunction = new scrypt_hashing_1.ScryptHashingFunction();
const userStore = new user_store_inmemory_1.InMemoryUserStore();
const jwtSerializerSecretKey = String(Math.random());
const jwtSerializerSecretProvider = new jwt_serializer_1.SimpleStringProvider(jwtSerializerSecretKey);
const notebookStore = new notebook_store_1.InMemoryNotebookStore();
const commonConfiguration = (overrides) => {
    return {
        userStore,
        jwtSerializerSecretProvider,
        authenticator: new authenticator_1.Authenticator({
            userStore: overrides.userStore || userStore,
            passwordHashingFunction,
            authTokensSerializer: new jwt_serializer_1.JWTSerializer({
                jwt: new jwt_serializer_1.StandardJwtImplementation(),
                secretKeyProvider: overrides.jwtSerializerSecretProvider || jwtSerializerSecretProvider,
            }),
        }),
        passwordHashingFunction,
        notebookStore,
        baseUrl: "",
        ...overrides,
    };
};
exports.commonConfiguration = commonConfiguration;
//# sourceMappingURL=common.js.map