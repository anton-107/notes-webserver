import { InMemoryUserStore } from "../stores/user/user-store-inmemory";
import {
  JWTSerializer,
  SimpleStringProvider,
  StandardJwtImplementation,
} from "authentication-module/dist/jwt-serializer";
import { ScryptHashingFunction } from "authentication-module/dist/scrypt-hashing";
import { Authenticator } from "authentication-module/dist/authenticator";
import { InMemoryNotebookStore } from "../stores/notebook/notebook-store";
import {
  ServiceConfiguration,
  ServiceConfigurationOverrides,
} from "./configuration";
import { InMemoryPersonStore } from "../stores/person/person-store";

const passwordHashingFunction = new ScryptHashingFunction();
const userStore = new InMemoryUserStore();
const jwtSerializerSecretKey = String(Math.random());
const jwtSerializerSecretProvider = new SimpleStringProvider(
  jwtSerializerSecretKey
);
const notebookStore = new InMemoryNotebookStore();
const personStore = new InMemoryPersonStore();

export const commonConfiguration = (
  overrides: ServiceConfigurationOverrides
): ServiceConfiguration => {
  return {
    userStore,
    jwtSerializerSecretProvider,
    authenticator: new Authenticator({
      userStore: overrides.userStore || userStore,
      passwordHashingFunction,
      authTokensSerializer: new JWTSerializer({
        jwt: new StandardJwtImplementation(),
        secretKeyProvider:
          overrides.jwtSerializerSecretProvider || jwtSerializerSecretProvider,
      }),
    }),
    passwordHashingFunction,
    notebookStore,
    personStore,
    baseUrl: "",
    ...overrides,
  };
};
