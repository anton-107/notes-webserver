"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSerializerSecretsManagerConfiguration = void 0;
const aws_sdk_1 = require("aws-sdk");
const secrets_manager_provider_1 = require("../secrets/secrets-manager-provider");
const jwtSerializerSecretsManagerConfiguration = (secretID) => {
    const r = {};
    r.jwtSerializerSecretProvider = new secrets_manager_provider_1.SecretsManagerProvider({
        secretsManager: new aws_sdk_1.SecretsManager(),
        secretID,
    });
    return r;
};
exports.jwtSerializerSecretsManagerConfiguration = jwtSerializerSecretsManagerConfiguration;
//# sourceMappingURL=jwt-serializer-secrets-manager.js.map