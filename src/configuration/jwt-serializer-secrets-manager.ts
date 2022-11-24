import { SecretsManager } from "aws-sdk";

import { SecretsManagerProvider } from "../secrets/secrets-manager-provider";
import { ServiceConfigurationOverrides } from "./configuration";

export const jwtSerializerSecretsManagerConfiguration = (
  secretID: string
): ServiceConfigurationOverrides => {
  const r: ServiceConfigurationOverrides = {};
  r.jwtSerializerSecretProvider = new SecretsManagerProvider({
    secretsManager: new SecretsManager(),
    secretID,
  });
  return r;
};
