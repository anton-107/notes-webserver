import { SecretKeyProvider } from "authentication-module/dist/jwt-serializer";
import { SecretsManager } from "aws-sdk";

interface SecretsManagerProviderProperties {
  secretsManager: SecretsManager;
  secretID: string;
}

export class SecretsManagerProvider implements SecretKeyProvider {
  constructor(private properties: SecretsManagerProviderProperties) {}
  public async getSecretKey(): Promise<string> {
    console.log("reading a secret");
    const response = await this.properties.secretsManager
      .getSecretValue({ SecretId: this.properties.secretID })
      .promise();
    console.log("reading a secret response", response);
    if (!response.SecretString) {
      console.error("Could not read secret from SecretsManager", response);
      throw "SecretsManager read error";
    }
    return response.SecretString;
  }
}
