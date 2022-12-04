import { Authenticator } from "authentication-module/dist/authenticator";
import {
  JWTSerializer,
  SimpleStringProvider,
  StandardJwtImplementation,
} from "authentication-module/dist/jwt-serializer";
import { ScryptHashingFunction } from "authentication-module/dist/scrypt-hashing";

import { PersonSelectorController } from "../controller/person/person-selector-controller";
import { PersonShortRepresentationController } from "../controller/person/person-short-representation-controller";
import { PostProcessorRegistry } from "../controller/post-processor";
import { corsHeaders } from "../http/cors-headers";
import { LoggerBunyan } from "../logger/logger-bunyan";
import { DateRangeNoteHandler } from "../registries/note-types/date-range-handler";
import { NotesContainerHandler } from "../registries/note-types/notes-container-handler";
import { PersonalDateRangeNoteHandler } from "../registries/note-types/personal-date-range-handler";
import { PlaintextNoteHandler } from "../registries/note-types/plaintext-handler";
import { YoutubeVideoHandler } from "../registries/note-types/youtube-video-handler";
import { NoteTypesRegistry } from "../registries/note-types-registry";
import { NotebookTableColumnsRegistry } from "../registries/notebook-table-columns-registry";
import { InMemoryAttachmentsStore } from "../stores/attachments/attachments-store";
import { InMemoryNoteAttachmentsStore } from "../stores/note/note-attachments-store";
import { InMemoryNoteStore } from "../stores/note/note-store";
import { InMemoryNotebookStore } from "../stores/notebook/notebook-store";
import { InMemoryPersonStore } from "../stores/person/person-store";
import { InMemorySearchStore } from "../stores/search/search-store";
import { InMemoryUserStore } from "../stores/user/user-store-inmemory";
import {
  ServiceConfiguration,
  ServiceConfigurationOverrides,
} from "./configuration";
import { NoOpYoutubeParser } from "./no-op/no-op-youtube-parser";

const defaultLogger = new LoggerBunyan();

const passwordHashingFunction = new ScryptHashingFunction();
const userStore = new InMemoryUserStore();
const jwtSerializerSecretKey = String(Math.random());
const jwtSerializerSecretProvider = new SimpleStringProvider(
  jwtSerializerSecretKey
);
const notebookStore = new InMemoryNotebookStore();
const personStore = new InMemoryPersonStore();
const noteStore = new InMemoryNoteStore();

const notebookTableColumnsRegistry = new NotebookTableColumnsRegistry();
notebookTableColumnsRegistry.addColumn({
  name: "Due date",
  columnType: "due-date",
  valueType: "date",
});
notebookTableColumnsRegistry.addColumn({
  name: "Start date",
  columnType: "start-date",
  valueType: "date",
});
notebookTableColumnsRegistry.addColumn({
  name: "End date",
  columnType: "end-date",
  valueType: "date",
});
notebookTableColumnsRegistry.addColumn({
  name: "Assignee",
  columnType: "task-assignee",
  valueType: "person-id",
});
notebookTableColumnsRegistry.addColumn({
  name: "Completed",
  columnType: "task-completed",
  valueType: "boolean",
});

const noteTypesRegistry = new NoteTypesRegistry();
noteTypesRegistry.addNoteTypeHandler(
  new PlaintextNoteHandler({ notebookTableColumnsRegistry })
);
noteTypesRegistry.addNoteTypeHandler(new DateRangeNoteHandler());
noteTypesRegistry.addNoteTypeHandler(new PersonalDateRangeNoteHandler());
noteTypesRegistry.addNoteTypeHandler(new NotesContainerHandler());
noteTypesRegistry.addNoteTypeHandler(
  new YoutubeVideoHandler({ notebookTableColumnsRegistry })
);

const postProcessorRegistry = new PostProcessorRegistry();
let configurationCache: ServiceConfiguration | undefined = undefined;

export function resetConfigurationCache() {
  configurationCache = undefined;
}

export const commonConfiguration = (
  overrides: ServiceConfigurationOverrides
): ServiceConfiguration => {
  if (configurationCache) {
    return configurationCache;
  }
  const logger = overrides.logger || defaultLogger;
  const commonConfiguration = {
    logger,
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
    notebookTableColumnsRegistry,
    corsHeaders: corsHeaders("*"),
    youtubeParser: new NoOpYoutubeParser(),
    attachmentsStore: new InMemoryAttachmentsStore({ logger }),
    noteAttachmentsStore: new InMemoryNoteAttachmentsStore(),
    searchStore: new InMemorySearchStore(notebookStore, noteStore),
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
