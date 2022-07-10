import {
  Authenticator,
  PasswordHashingFunction,
  UserStore,
} from "authentication-module/dist/authenticator";
import { SecretKeyProvider } from "authentication-module/dist/jwt-serializer";
import { NotebookStore } from "../stores/notebook/notebook-store";
import { PersonStore } from "../stores/person/person-store";
import { HttpRedirectView } from "../views/http-redirect-view";
import { NotebookHtmlView } from "../views/notebook/notebook-html-view";
import { PersonHtmlView } from "../views/person/person-html-view";
import { commonConfiguration } from "./common";
import { jwtSerializerSecretsManagerConfiguration } from "./jwt-serializer-secrets-manager";
import { notebookStoreDynamoConfiguration } from "./notebook-store-dynamo";
import { userStoreDynamoConfiguration } from "./user-store-dynamo";

export interface ServiceConfiguration {
  authenticator: Authenticator;
  jwtSerializerSecretProvider: SecretKeyProvider;
  notebookStore: NotebookStore;
  personStore: PersonStore;
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
  if (process.env["NOTEBOOK_STORE_TYPE"] === "dynamodb") {
    Object.assign(contextConfiguration, notebookStoreDynamoConfiguration());
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
export const notebookControllerConfiguration = (
  overrides: ServiceConfigurationOverrides
) => {
  const configuration = dependenciesConfiguration({});
  return {
    ...configuration,
    entityView: new NotebookHtmlView({ ...configuration }),
    httpRedirectView: new HttpRedirectView({ ...configuration }),
    entityStore: configuration.notebookStore,
    ...overrides,
  };
};
export const personControllerConfiguration = (
  overrides: ServiceConfigurationOverrides
) => {
  const configuration = dependenciesConfiguration({});
  return {
    ...configuration,
    entityView: new PersonHtmlView({ ...configuration }),
    httpRedirectView: new HttpRedirectView({ ...configuration }),
    entityStore: configuration.personStore,
    ...overrides,
  };
};
