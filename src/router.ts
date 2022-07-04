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
];
