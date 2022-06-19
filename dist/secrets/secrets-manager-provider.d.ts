import { SecretKeyProvider } from "authentication-module/dist/jwt-serializer";
import { SecretsManager } from "aws-sdk";
interface SecretsManagerProviderProperties {
    secretsManager: SecretsManager;
    secretID: string;
}
export declare class SecretsManagerProvider implements SecretKeyProvider {
    private properties;
    constructor(properties: SecretsManagerProviderProperties);
    getSecretKey(): Promise<string>;
}
export {};
