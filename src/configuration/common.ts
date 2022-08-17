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
import { InMemoryNoteStore } from "../stores/note/note-store";
import { NoteTypesRegistry } from "../registries/note-types-registry";
import { PlaintextNoteHandler } from "../registries/note-types/plaintext-handler";
import { DateRangeNoteHandler } from "../registries/note-types/date-range-handler";
import { PersonalDateRangeNoteHandler } from "../registries/note-types/personal-date-range-handler";
import { PostProcessorRegistry } from "../controller/post-processor";
import { PersonSelectorController } from "../controller/person/person-selector-controller";
import { PersonShortRepresentationController } from "../controller/person/person-short-representation-controller";
import { corsHeaders } from "../http/cors-headers";

const passwordHashingFunction = new ScryptHashingFunction();
const userStore = new InMemoryUserStore();
const jwtSerializerSecretKey = String(Math.random());
const jwtSerializerSecretProvider = new SimpleStringProvider(
  jwtSerializerSecretKey
);
const notebookStore = new InMemoryNotebookStore();
const personStore = new InMemoryPersonStore();
const noteStore = new InMemoryNoteStore();
const noteTypesRegistry = new NoteTypesRegistry();

noteTypesRegistry.addNoteTypeHandler(new PlaintextNoteHandler());
noteTypesRegistry.addNoteTypeHandler(new DateRangeNoteHandler());
noteTypesRegistry.addNoteTypeHandler(new PersonalDateRangeNoteHandler());

const postProcessorRegistry = new PostProcessorRegistry();
let configurationCache: ServiceConfiguration | undefined = undefined;

export const commonConfiguration = (
  overrides: ServiceConfigurationOverrides
): ServiceConfiguration => {
  if (configurationCache) {
    return configurationCache;
  }
  const commonConfiguration = {
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
    noteStore,
    baseUrl: "",
    noteTypesRegistry,
    postProcessorRegistry,
    corsHeaders: corsHeaders("*"),
    ...overrides,
  };

  postProcessorRegistry.addPostProcessor(
    new PersonSelectorController(commonConfiguration)
  );
  postProcessorRegistry.addPostProcessor(
    new PersonShortRepresentationController(commonConfiguration)
  );

  configurationCache = commonConfiguration;
  return commonConfiguration;
};
