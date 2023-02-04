"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflows = exports.actions = exports.routes = void 0;
const path_1 = require("path");
const fetch_video_information_1 = require("./actions/fetch-video-information/fetch-video-information");
const trigger_delete_notebook_workflow_1 = require("./actions/trigger-workflow/trigger-delete-notebook-workflow");
const get_signin_1 = require("./routes/auth/get-signin");
const get_whoami_1 = require("./routes/auth/get-whoami");
const post_signin_1 = require("./routes/auth/post-signin");
const post_signout_1 = require("./routes/auth/post-signout");
const get_home_1 = require("./routes/get-home");
const download_attachment_1 = require("./routes/note/attachment/download-attachment");
const get_note_attachments_1 = require("./routes/note/attachment/get-note-attachments");
const get_all_notes_in_notebook_1 = require("./routes/note/get-all-notes-in-notebook");
const get_edit_note_1 = require("./routes/note/get-edit-note");
const get_new_note_1 = require("./routes/note/get-new-note");
const post_delete_note_1 = require("./routes/note/post-delete-note");
const post_edit_note_1 = require("./routes/note/post-edit-note");
const post_new_note_1 = require("./routes/note/post-new-note");
const get_all_notebooks_1 = require("./routes/notebook/get-all-notebooks");
const get_edit_notebook_1 = require("./routes/notebook/get-edit-notebook");
const get_new_notebook_1 = require("./routes/notebook/get-new-notebook");
const get_one_notebook_1 = require("./routes/notebook/get-one-notebook");
const get_supported_columns_1 = require("./routes/notebook/get-supported-columns");
const post_delete_notebook_1 = require("./routes/notebook/post-delete-notebook");
const post_edit_notebook_1 = require("./routes/notebook/post-edit-notebook");
const post_notebook_1 = require("./routes/notebook/post-notebook");
const get_all_people_1 = require("./routes/person/get-all-people");
const get_edit_person_1 = require("./routes/person/get-edit-person");
const get_new_person_1 = require("./routes/person/get-new-person");
const get_one_person_1 = require("./routes/person/get-one-person");
const post_delete_person_1 = require("./routes/person/post-delete-person");
const post_edit_person_1 = require("./routes/person/post-edit-person");
const post_person_1 = require("./routes/person/post-person");
const search_all_1 = require("./routes/search/search-all");
const notebook_deletion_workflow_1 = require("./workflows/notebook-deletion/notebook-deletion-workflow");
exports.routes = [
    {
        method: "GET",
        path: "/home",
        import: (0, path_1.join)(__dirname, "./routes/get-home"),
        action: get_home_1.getHomeHandler.name,
    },
    {
        method: "GET",
        path: "/signin",
        import: (0, path_1.join)(__dirname, "./routes/auth/get-signin"),
        action: get_signin_1.getSigninHandler.name,
    },
    {
        method: "GET",
        path: "/whoami",
        import: (0, path_1.join)(__dirname, "./routes/auth/get-whoami"),
        action: get_whoami_1.getWhoamiHandler.name,
    },
    {
        method: "POST",
        path: "/signin",
        import: (0, path_1.join)(__dirname, "./routes/auth/post-signin"),
        action: post_signin_1.postSigninHandler.name,
    },
    {
        method: "POST",
        path: "/signout",
        import: (0, path_1.join)(__dirname, "./routes/auth/post-signout"),
        action: post_signout_1.postSignoutHandler.name,
    },
    {
        method: "GET",
        path: "/new-notebook",
        import: (0, path_1.join)(__dirname, "./routes/notebook/get-new-notebook"),
        action: get_new_notebook_1.getNewNotebookHandler.name,
    },
    {
        method: "POST",
        path: "/notebook",
        import: (0, path_1.join)(__dirname, "./routes/notebook/post-notebook"),
        action: post_notebook_1.postNotebookHandler.name,
    },
    {
        method: "GET",
        path: "/notebook",
        import: (0, path_1.join)(__dirname, "./routes/notebook/get-all-notebooks"),
        action: get_all_notebooks_1.getAllNotebooksHandler.name,
    },
    {
        method: "GET",
        path: "/notebook/:notebookID",
        import: (0, path_1.join)(__dirname, "./routes/notebook/get-one-notebook"),
        action: get_one_notebook_1.getOneNotebookHandler.name,
    },
    {
        method: "GET",
        path: "/notebook/:notebookID/edit",
        import: (0, path_1.join)(__dirname, "./routes/notebook/get-edit-notebook"),
        action: get_edit_notebook_1.getEditNotebookHandler.name,
    },
    {
        method: "POST",
        path: "/notebook/:notebookID/edit",
        import: (0, path_1.join)(__dirname, "./routes/notebook/post-edit-notebook"),
        action: post_edit_notebook_1.postEditNotebookHandler.name,
    },
    {
        method: "POST",
        path: "/delete-notebook",
        import: (0, path_1.join)(__dirname, "./routes/notebook/post-delete-notebook"),
        action: post_delete_notebook_1.deleteOneNotebookHandler.name,
    },
    {
        method: "GET",
        path: "/new-person",
        import: (0, path_1.join)(__dirname, "./routes/person/get-new-person"),
        action: get_new_person_1.getNewPersonHandler.name,
    },
    {
        method: "POST",
        path: "/person",
        import: (0, path_1.join)(__dirname, "./routes/person/post-person"),
        action: post_person_1.postPersonHandler.name,
    },
    {
        method: "GET",
        path: "/person",
        import: (0, path_1.join)(__dirname, "./routes/person/get-all-people"),
        action: get_all_people_1.getAllPeopleHandler.name,
    },
    {
        method: "GET",
        path: "/person/:personID",
        import: (0, path_1.join)(__dirname, "./routes/person/get-one-person"),
        action: get_one_person_1.getOnePersonHandler.name,
    },
    {
        method: "GET",
        path: "/person/:personID/edit",
        import: (0, path_1.join)(__dirname, "./routes/person/get-edit-person"),
        action: get_edit_person_1.getEditPersonHandler.name,
    },
    {
        method: "POST",
        path: "/person/:personID/edit",
        import: (0, path_1.join)(__dirname, "./routes/person/post-edit-person"),
        action: post_edit_person_1.postEditPersonHandler.name,
    },
    {
        method: "POST",
        path: "/delete-person",
        import: (0, path_1.join)(__dirname, "./routes/person/post-delete-person"),
        action: post_delete_person_1.deleteOnePersonHandler.name,
    },
    {
        method: "GET",
        path: "/notebook/:notebookID/new-note/:noteType",
        import: (0, path_1.join)(__dirname, "./routes/note/get-new-note"),
        action: get_new_note_1.getNewNoteHandler.name,
    },
    {
        method: "GET",
        path: "/notebook/:notebookID/note",
        import: (0, path_1.join)(__dirname, "./routes/note/get-all-notes-in-notebook"),
        action: get_all_notes_in_notebook_1.getAllNotesInNotebookHandler.name,
    },
    {
        method: "POST",
        path: "/note",
        import: (0, path_1.join)(__dirname, "./routes/note/post-new-note"),
        action: post_new_note_1.postNewNoteHandler.name,
    },
    {
        method: "GET",
        path: "/notebook/:notebookID/note/:noteID/edit",
        import: (0, path_1.join)(__dirname, "./routes/note/get-edit-note"),
        action: get_edit_note_1.getEditNoteHandler.name,
    },
    {
        method: "POST",
        path: "/note/:noteID/edit",
        import: (0, path_1.join)(__dirname, "./routes/note/post-edit-note"),
        action: post_edit_note_1.postEditNoteHandler.name,
    },
    {
        method: "POST",
        path: "/note/delete",
        import: (0, path_1.join)(__dirname, "./routes/note/post-delete-note"),
        action: post_delete_note_1.postDeleteNoteHandler.name,
    },
    {
        method: "GET",
        path: "/notebook-supported-columns",
        import: (0, path_1.join)(__dirname, "./routes/notebook/get-supported-columns"),
        action: get_supported_columns_1.getNotebookSupportedColumnsHandler.name,
    },
    {
        method: "GET",
        path: "/note/:noteID/attachment",
        import: (0, path_1.join)(__dirname, "./routes/note/attachment/get-note-attachments"),
        action: get_note_attachments_1.getNoteAttachmentsHandler.name,
    },
    {
        method: "GET",
        path: "/note/:noteID/attachment/:attachmentID",
        import: (0, path_1.join)(__dirname, "./routes/note/attachment/download-attachment"),
        action: download_attachment_1.downloadAttachmentHandler.name,
    },
    {
        method: "GET",
        path: "/search",
        import: (0, path_1.join)(__dirname, "./routes/search/search-all"),
        action: search_all_1.searchAllHandler.name,
    },
];
exports.actions = [
    {
        actionName: "fetch-video-information",
        import: (0, path_1.join)(__dirname, "./actions/fetch-video-information/fetch-video-information"),
        action: fetch_video_information_1.runFetchVideoInformation.name,
        eventSource: "note-entries",
    },
    {
        actionName: "trigger-delete-notebook-workflow",
        import: (0, path_1.join)(__dirname, "./actions/trigger-workflow/trigger-delete-notebook-workflow"),
        action: trigger_delete_notebook_workflow_1.runTriggerDeleteNotebookWorkflow.name,
        eventSource: "notebook-entries",
    },
];
exports.workflows = [
    { name: 'notebook-deletion', tasks: notebook_deletion_workflow_1.notebookDeletionWorkflow }
];
//# sourceMappingURL=router.js.map