import {
  Authenticator,
  PasswordHashingFunction,
  UserStore,
} from "authentication-module/dist/authenticator";
import { SecretKeyProvider } from "authentication-module/dist/jwt-serializer";
import { NotebookStore } from "../notebook-store";
import { commonConfiguration } from "./common";
import { jwtSerializerSecretsManagerConfiguration } from "./jwt-serializer-secrets-manager";
import { userStoreDynamoConfiguration } from "./user-store-dynamo";

export interface ServiceConfiguration {
  authenticator: Authenticator;
  jwtSerializerSecretProvider: SecretKeyProvider;
  notebookStore: NotebookStore;
  passwordHashingFunction: PasswordHashingFunction;
  userStore: UserStore;
  baseUrl: string;
}
export type ServiceConfigurationOverrides = Partial<ServiceConfiguration>;

export const dependenciesConfiguration = (
  overrides: ServiceConfigurationOverrides
): ServiceConfiguration => {
  const contextConfiguration: ServiceConfigurationOverrides = {};
  if (process.env["USER_STORE_TYPE"] === "dynamodb") {
    Object.assign(contextConfiguration, userStoreDynamoConfiguration());
  }
  if (process.env["JWT_SERIALIZER_SECRET_ID"]) {
    Object.assign(
      contextConfiguration,
      jwtSerializerSecretsManagerConfiguration(
        process.env["JWT_SERIALIZER_SECRET_ID"]
      )
    );
  }
  contextConfiguration.baseUrl = process.env["BASE_URL"] || "";
  return commonConfiguration({
    ...contextConfiguration,
    ...overrides,
  });
};
