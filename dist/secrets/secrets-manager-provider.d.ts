import { SecretKeyProvider } from "authentication-module/dist/jwt-serializer";
import { SecretsManager } from "aws-sdk";

import { Logger } from "../logger/logger";
interface SecretsManagerProviderProperties {
    logger: Logger;
    secretsManager: SecretsManager;
    secretID: string;
}
export declare class SecretsManagerProvider implements SecretKeyProvider {
    private properties;
    constructor(properties: SecretsManagerProviderProperties);
    getSecretKey(): Promise<string>;
}
export {};
