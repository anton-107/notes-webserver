import { SecretKeyProvider } from "authentication-module/dist/jwt-serializer";
import { SecretsManager } from "aws-sdk";

import { Logger } from "../logger/logger";

interface SecretsManagerProviderProperties {
  logger: Logger;
  secretsManager: SecretsManager;
  secretID: string;
}

export class SecretsManagerProvider implements SecretKeyProvider {
  constructor(private properties: SecretsManagerProviderProperties) {}
  public async getSecretKey(): Promise<string> {
    this.properties.logger.info("reading a secret");
    const response = await this.properties.secretsManager
      .getSecretValue({ SecretId: this.properties.secretID })
      .promise();
    this.properties.logger.info("reading a secret response", {
      data: response,
    });
    if (!response.SecretString) {
      this.properties.logger.error(
        "Could not read secret from SecretsManager",
        { data: response }
      );
      throw "SecretsManager read error";
    }
    return response.SecretString;
  }
}
