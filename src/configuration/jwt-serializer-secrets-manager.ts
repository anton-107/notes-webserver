import { SecretsManager } from "aws-sdk";

import { Logger } from "../logger/logger";
import { SecretsManagerProvider } from "../secrets/secrets-manager-provider";
import { ServiceConfigurationOverrides } from "./configuration";

export const jwtSerializerSecretsManagerConfiguration = (
  logger: Logger,
  secretID: string
): ServiceConfigurationOverrides => {
  const r: ServiceConfigurationOverrides = {};
  r.jwtSerializerSecretProvider = new SecretsManagerProvider({
    logger,
    secretsManager: new SecretsManager(),
    secretID,
  });
  return r;
};
