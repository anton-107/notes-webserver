"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretsManagerProvider = void 0;
class SecretsManagerProvider {
    constructor(properties) {
        this.properties = properties;
    }
    async getSecretKey() {
        this.properties.logger.info("reading a secret");
        const response = await this.properties.secretsManager
            .getSecretValue({ SecretId: this.properties.secretID })
            .promise();
        this.properties.logger.info("reading a secret response", {
            data: response,
        });
        if (!response.SecretString) {
            this.properties.logger.error("Could not read secret from SecretsManager", { data: response });
            throw "SecretsManager read error";
        }
        return response.SecretString;
    }
}
exports.SecretsManagerProvider = SecretsManagerProvider;
//# sourceMappingURL=secrets-manager-provider.js.map