import { join } from "path";
import { getHomeHandler } from "./routes/get-home";
import { getSigninHandler } from "./routes/auth/get-signin";
import { postSigninHandler } from "./routes/auth/post-signin";
import { postSignoutHandler } from "./routes/auth/post-signout";
import { getNewNotebookHandler } from "./routes/notebook/get-new-notebook";
import { postNotebookHandler } from "./routes/notebook/post-notebook";
import { getOneNotebookHandler } from "./routes/notebook/get-one-notebook";
import { getEditNotebookHandler } from "./routes/notebook/get-edit-notebook";
import { postEditNotebookHandler } from "./routes/notebook/post-edit-notebook";
import { deleteOneNotebookHandler } from "./routes/notebook/post-delete-notebook";
import { getNewPersonHandler } from "./routes/person/get-new-person";
import { postPersonHandler } from "./routes/person/post-person";
import { getOnePersonHandler } from "./routes/person/get-one-person";
import { getEditPersonHandler } from "./routes/person/get-edit-person";
import { postEditPersonHandler } from "./routes/person/post-edit-person";
import { deleteOnePersonHandler } from "./routes/person/post-delete-person";
import { getNewNoteHandler } from "./routes/note/get-new-note";
import { postNewNoteHandler } from "./routes/note/post-new-note";
import { getEditNoteHandler } from "./routes/note/get-edit-note";
import { postEditNoteHandler } from "./routes/note/post-edit-note";
import { postDeleteNoteHandler } from "./routes/note/post-delete-note";

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
    path: "/notebook/:notebookID/new-note",
    import: join(__dirname, "./routes/note/get-new-note"),
    action: getNewNoteHandler.name,
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
];
