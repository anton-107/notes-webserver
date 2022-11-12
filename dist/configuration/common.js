"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonConfiguration = exports.resetConfigurationCache = void 0;
const user_store_inmemory_1 = require("../stores/user/user-store-inmemory");
const jwt_serializer_1 = require("authentication-module/dist/jwt-serializer");
const scrypt_hashing_1 = require("authentication-module/dist/scrypt-hashing");
const authenticator_1 = require("authentication-module/dist/authenticator");
const notebook_store_1 = require("../stores/notebook/notebook-store");
const person_store_1 = require("../stores/person/person-store");
const note_store_1 = require("../stores/note/note-store");
const note_types_registry_1 = require("../registries/note-types-registry");
const plaintext_handler_1 = require("../registries/note-types/plaintext-handler");
const date_range_handler_1 = require("../registries/note-types/date-range-handler");
const personal_date_range_handler_1 = require("../registries/note-types/personal-date-range-handler");
const post_processor_1 = require("../controller/post-processor");
const person_selector_controller_1 = require("../controller/person/person-selector-controller");
const person_short_representation_controller_1 = require("../controller/person/person-short-representation-controller");
const cors_headers_1 = require("../http/cors-headers");
const notes_container_handler_1 = require("../registries/note-types/notes-container-handler");
const notebook_table_columns_registry_1 = require("../registries/notebook-table-columns-registry");
const youtube_video_handler_1 = require("../registries/note-types/youtube-video-handler");
const no_op_youtube_parser_1 = require("./no-op/no-op-youtube-parser");
const passwordHashingFunction = new scrypt_hashing_1.ScryptHashingFunction();
const userStore = new user_store_inmemory_1.InMemoryUserStore();
const jwtSerializerSecretKey = String(Math.random());
const jwtSerializerSecretProvider = new jwt_serializer_1.SimpleStringProvider(jwtSerializerSecretKey);
const notebookStore = new notebook_store_1.InMemoryNotebookStore();
const personStore = new person_store_1.InMemoryPersonStore();
const noteStore = new note_store_1.InMemoryNoteStore();
const notebookTableColumnsRegistry = new notebook_table_columns_registry_1.NotebookTableColumnsRegistry();
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
const noteTypesRegistry = new note_types_registry_1.NoteTypesRegistry();
noteTypesRegistry.addNoteTypeHandler(new plaintext_handler_1.PlaintextNoteHandler({ notebookTableColumnsRegistry }));
noteTypesRegistry.addNoteTypeHandler(new date_range_handler_1.DateRangeNoteHandler());
noteTypesRegistry.addNoteTypeHandler(new personal_date_range_handler_1.PersonalDateRangeNoteHandler());
noteTypesRegistry.addNoteTypeHandler(new notes_container_handler_1.NotesContainerHandler());
noteTypesRegistry.addNoteTypeHandler(new youtube_video_handler_1.YoutubeVideoHandler({ notebookTableColumnsRegistry }));
const postProcessorRegistry = new post_processor_1.PostProcessorRegistry();
let configurationCache = undefined;
function resetConfigurationCache() {
    configurationCache = undefined;
}
exports.resetConfigurationCache = resetConfigurationCache;
const commonConfiguration = (overrides) => {
    if (configurationCache) {
        return configurationCache;
    }
    const commonConfiguration = {
        userStore,
        jwtSerializerSecretProvider,
        authenticator: new authenticator_1.Authenticator({
            userStore: overrides.userStore || userStore,
            passwordHashingFunction,
            authTokensSerializer: new jwt_serializer_1.JWTSerializer({
                jwt: new jwt_serializer_1.StandardJwtImplementation(),
                secretKeyProvider: overrides.jwtSerializerSecretProvider || jwtSerializerSecretProvider,
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
        corsHeaders: (0, cors_headers_1.corsHeaders)("*"),
        youtubeParser: new no_op_youtube_parser_1.NoOpYoutubeParser(),
        ...overrides,
    };
    postProcessorRegistry.addPostProcessor(new person_selector_controller_1.PersonSelectorController(commonConfiguration));
    postProcessorRegistry.addPostProcessor(new person_short_representation_controller_1.PersonShortRepresentationController(commonConfiguration));
    configurationCache = commonConfiguration;
    return commonConfiguration;
};
exports.commonConfiguration = commonConfiguration;
//# sourceMappingURL=common.js.map