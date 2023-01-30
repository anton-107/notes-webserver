import {
  Authenticator,
  PasswordHashingFunction,
  UserStore,
} from "authentication-module/dist/authenticator";
import { SecretKeyProvider } from "authentication-module/dist/jwt-serializer";

import { YoutubeParser } from "../actions/fetch-video-information/interfaces";
import { PostProcessorRegistry } from "../controller/post-processor";
import { CORSHeaders } from "../http/cors-headers";
import { Logger } from "../logger/logger";
import { NoteTypesRegistry } from "../registries/note-types-registry";
import { NotebookTableColumnsRegistry } from "../registries/notebook-table-columns-registry";
import { AttachmentsStore } from "../stores/attachments/attachments-store";
import { NoteAttachmentsStore } from "../stores/note/note-attachments-store";
import { NoteStore } from "../stores/note/note-store";
import { NotebookStore } from "../stores/notebook/notebook-store";
import { PersonStore } from "../stores/person/person-store";
import { SearchStore } from "../stores/search/search-store";
import { WorkflowExecutor } from "../workflows/interfaces";

export interface ServiceConfiguration {
  logger: Logger;
  authenticator: Authenticator;
  jwtSerializerSecretProvider: SecretKeyProvider;
  notebookStore: NotebookStore;
  personStore: PersonStore;
  noteStore: NoteStore;
  noteTypesRegistry: NoteTypesRegistry;
  postProcessorRegistry: PostProcessorRegistry;
  notebookTableColumnsRegistry: NotebookTableColumnsRegistry;
  passwordHashingFunction: PasswordHashingFunction;
  userStore: UserStore;
  corsHeaders: CORSHeaders;
  baseUrl: string;
  youtubeParser: YoutubeParser;
  attachmentsStore: AttachmentsStore;
  noteAttachmentsStore: NoteAttachmentsStore;
  searchStore: SearchStore;
  notebookDeletionStateMachine: WorkflowExecutor;
}
export type ServiceConfigurationOverrides = Partial<ServiceConfiguration>;
