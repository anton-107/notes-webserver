import { InMemoryUserStore } from "../stores/user-store-inmemory";
import {
  JWTSerializer,
  SimpleStringProvider,
  StandardJwtImplementation,
} from "authentication-module/dist/jwt-serializer";
import { ScryptHashingFunction } from "authentication-module/dist/scrypt-hashing";
import { Authenticator } from "authentication-module/dist/authenticator";
import { NotebookStore } from "../notebook-store";
import {
  ServiceConfiguration,
  ServiceConfigurationOverrides,
} from "./configuration";

const passwordHashingFunction = new ScryptHashingFunction();
const userStore = new InMemoryUserStore();
const jwtSerializerSecretKey = String(Math.random());
const notebookStore = new NotebookStore();

export const commonConfiguration = (
  overrides: ServiceConfigurationOverrides
): ServiceConfiguration => {
  return {
    userStore,
    authenticator: new Authenticator({
      userStore: overrides.userStore || userStore,
      passwordHashingFunction,
      authTokensSerializer: new JWTSerializer({
        jwt: new StandardJwtImplementation(),
        secretKeyProvider: new SimpleStringProvider(jwtSerializerSecretKey),
      }),
    }),
    passwordHashingFunction,
    notebookStore,
    baseUrl: "",
    ...overrides,
  };
};
