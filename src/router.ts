import { join } from "path";

import { runFetchVideoInformation } from "./actions/fetch-video-information/fetch-video-information";
import { runTriggerDeleteNotebookWorkflow } from "./actions/trigger-workflow/trigger-delete-notebook-workflow";
import { getSigninHandler } from "./routes/auth/get-signin";
import { getWhoamiHandler } from "./routes/auth/get-whoami";
import { postSigninHandler } from "./routes/auth/post-signin";
import { postSignoutHandler } from "./routes/auth/post-signout";
import { getHomeHandler } from "./routes/get-home";
import { downloadAttachmentHandler } from "./routes/note/attachment/download-attachment";
import { getNoteAttachmentsHandler } from "./routes/note/attachment/get-note-attachments";
import { getAllNotesInNotebookHandler } from "./routes/note/get-all-notes-in-notebook";
import { getEditNoteHandler } from "./routes/note/get-edit-note";
import { getNewNoteHandler } from "./routes/note/get-new-note";
import { postDeleteNoteHandler } from "./routes/note/post-delete-note";
import { postEditNoteHandler } from "./routes/note/post-edit-note";
import { postNewNoteHandler } from "./routes/note/post-new-note";
import { getAllNotebooksHandler } from "./routes/notebook/get-all-notebooks";
import { getEditNotebookHandler } from "./routes/notebook/get-edit-notebook";
import { getNewNotebookHandler } from "./routes/notebook/get-new-notebook";
import { getOneNotebookHandler } from "./routes/notebook/get-one-notebook";
import { getNotebookSupportedColumnsHandler } from "./routes/notebook/get-supported-columns";
import { deleteOneNotebookHandler } from "./routes/notebook/post-delete-notebook";
import { postEditNotebookHandler } from "./routes/notebook/post-edit-notebook";
import { postNotebookHandler } from "./routes/notebook/post-notebook";
import { getAllPeopleHandler } from "./routes/person/get-all-people";
import { getEditPersonHandler } from "./routes/person/get-edit-person";
import { getNewPersonHandler } from "./routes/person/get-new-person";
import { getOnePersonHandler } from "./routes/person/get-one-person";
import { deleteOnePersonHandler } from "./routes/person/post-delete-person";
import { postEditPersonHandler } from "./routes/person/post-edit-person";
import { postPersonHandler } from "./routes/person/post-person";
import { searchAllHandler } from "./routes/search/search-all";
import { notebookDeletionWorkflow } from "./workflows/notebook-deletion/notebook-deletion-workflow";

export interface Route {
  method: "GET" | "POST";
  path: string;
  import: string;
  action: string;
}

export const routes: Route[] = [
  {
    method: "GET",
    path: "/home",
    import: join(__dirname, "./routes/get-home"),
    action: getHomeHandler.name,
  },
  {
    method: "GET",
    path: "/signin",
    import: join(__dirname, "./routes/auth/get-signin"),
    action: getSigninHandler.name,
  },
  {
    method: "GET",
    path: "/whoami",
    import: join(__dirname, "./routes/auth/get-whoami"),
    action: getWhoamiHandler.name,
  },
  {
    method: "POST",
    path: "/signin",
    import: join(__dirname, "./routes/auth/post-signin"),
    action: postSigninHandler.name,
  },
  {
    method: "POST",
    path: "/signout",
    import: join(__dirname, "./routes/auth/post-signout"),
    action: postSignoutHandler.name,
  },
  {
    method: "GET",
    path: "/new-notebook",
    import: join(__dirname, "./routes/notebook/get-new-notebook"),
    action: getNewNotebookHandler.name,
  },
  {
    method: "POST",
    path: "/notebook",
    import: join(__dirname, "./routes/notebook/post-notebook"),
    action: postNotebookHandler.name,
  },
  {
    method: "GET",
    path: "/notebook",
    import: join(__dirname, "./routes/notebook/get-all-notebooks"),
    action: getAllNotebooksHandler.name,
  },
  {
    method: "GET",
    path: "/notebook/:notebookID",
    import: join(__dirname, "./routes/notebook/get-one-notebook"),
    action: getOneNotebookHandler.name,
  },
  {
    method: "GET",
    path: "/notebook/:notebookID/edit",
    import: join(__dirname, "./routes/notebook/get-edit-notebook"),
    action: getEditNotebookHandler.name,
  },
  {
    method: "POST",
    path: "/notebook/:notebookID/edit",
    import: join(__dirname, "./routes/notebook/post-edit-notebook"),
    action: postEditNotebookHandler.name,
  },
  {
    method: "POST",
    path: "/delete-notebook",
    import: join(__dirname, "./routes/notebook/post-delete-notebook"),
    action: deleteOneNotebookHandler.name,
  },
  {
    method: "GET",
    path: "/new-person",
    import: join(__dirname, "./routes/person/get-new-person"),
    action: getNewPersonHandler.name,
  },
  {
    method: "POST",
    path: "/person",
    import: join(__dirname, "./routes/person/post-person"),
    action: postPersonHandler.name,
  },
  {
    method: "GET",
    path: "/person",
    import: join(__dirname, "./routes/person/get-all-people"),
    action: getAllPeopleHandler.name,
  },
  {
    method: "GET",
    path: "/person/:personID",
    import: join(__dirname, "./routes/person/get-one-person"),
    action: getOnePersonHandler.name,
  },
  {
    method: "GET",
    path: "/person/:personID/edit",
    import: join(__dirname, "./routes/person/get-edit-person"),
    action: getEditPersonHandler.name,
  },
  {
    method: "POST",
    path: "/person/:personID/edit",
    import: join(__dirname, "./routes/person/post-edit-person"),
    action: postEditPersonHandler.name,
  },
  {
    method: "POST",
    path: "/delete-person",
    import: join(__dirname, "./routes/person/post-delete-person"),
    action: deleteOnePersonHandler.name,
  },
  {
    method: "GET",
    path: "/notebook/:notebookID/new-note/:noteType",
    import: join(__dirname, "./routes/note/get-new-note"),
    action: getNewNoteHandler.name,
  },
  {
    method: "GET",
    path: "/notebook/:notebookID/note",
    import: join(__dirname, "./routes/note/get-all-notes-in-notebook"),
    action: getAllNotesInNotebookHandler.name,
  },
  {
    method: "POST",
    path: "/note",
    import: join(__dirname, "./routes/note/post-new-note"),
    action: postNewNoteHandler.name,
  },
  {
    method: "GET",
    path: "/notebook/:notebookID/note/:noteID/edit",
    import: join(__dirname, "./routes/note/get-edit-note"),
    action: getEditNoteHandler.name,
  },
  {
    method: "POST",
    path: "/note/:noteID/edit",
    import: join(__dirname, "./routes/note/post-edit-note"),
    action: postEditNoteHandler.name,
  },
  {
    method: "POST",
    path: "/note/delete",
    import: join(__dirname, "./routes/note/post-delete-note"),
    action: postDeleteNoteHandler.name,
  },
  {
    method: "GET",
    path: "/notebook-supported-columns",
    import: join(__dirname, "./routes/notebook/get-supported-columns"),
    action: getNotebookSupportedColumnsHandler.name,
  },
  {
    method: "GET",
    path: "/note/:noteID/attachment",
    import: join(__dirname, "./routes/note/attachment/get-note-attachments"),
    action: getNoteAttachmentsHandler.name,
  },
  {
    method: "GET",
    path: "/note/:noteID/attachment/:attachmentID",
    import: join(__dirname, "./routes/note/attachment/download-attachment"),
    action: downloadAttachmentHandler.name,
  },
  {
    method: "GET",
    path: "/search",
    import: join(__dirname, "./routes/search/search-all"),
    action: searchAllHandler.name,
  },
];

export interface Action {
  actionName: string;
  import: string;
  action: string;
}

export interface ReactiveAction extends Action {
  eventSource: "notebook-entries" | "note-entries";
}

export const actions: ReactiveAction[] = [
  {
    actionName: "fetch-video-information",
    import: join(__dirname, "./actions/fetch-video-information"),
    action: runFetchVideoInformation.name,
    eventSource: "note-entries",
  },
  {
    actionName: "trigger-delete-notebook-workflow",
    import: join(__dirname, "./actions/trigger-workflow"),
    action: runTriggerDeleteNotebookWorkflow.name,
    eventSource: "notebook-entries",
  },
];

export interface WorkflowRecord {
  type: string;
  action: Action | undefined;
}
export interface Workflow {
  workflow: WorkflowRecord[];
}
export const workflows: Workflow[] = [{ workflow: notebookDeletionWorkflow }];
