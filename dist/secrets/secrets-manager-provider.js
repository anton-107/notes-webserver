"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretsManagerProvider = void 0;
class SecretsManagerProvider {
    constructor(properties) {
        this.properties = properties;
    }
    async getSecretKey() {
        console.log('reading a secret');
        const response = await this.properties.secretsManager
            .getSecretValue({ SecretId: this.properties.secretID })
            .promise();
        console.log('reading a secret response', response);
        if (!response.SecretString) {
            console.error("Could not read secret from SecretsManager", response);
            throw "SecretsManager read error";
        }
        return response.SecretString;
    }
}
exports.SecretsManagerProvider = SecretsManagerProvider;
//# sourceMappingURL=secrets-manager-provider.js.map