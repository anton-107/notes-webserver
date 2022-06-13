import {
  Authenticator,
  PasswordHashingFunction,
  UserStore,
} from "authentication-module/dist/authenticator";
import { NotebookStore } from "../notebook-store";
import { commonConfiguration } from "./common";
import { userStoreDynamoConfiguration } from "./user-store-dynamo";

export interface ServiceConfiguration {
  authenticator: Authenticator;
  notebookStore: NotebookStore;
  passwordHashingFunction: PasswordHashingFunction;
  userStore: UserStore;
  jwtSerializerSecretKey: string;
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
  contextConfiguration.baseUrl = process.env["BASE_URL"] || "";
  return commonConfiguration({
    ...contextConfiguration,
    ...overrides,
  });
};
