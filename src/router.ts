import { join } from "path";
import { getHomeHandler } from "./routes/get-home";
import { getNewNotebookHandler } from "./routes/get-new-notebook";
import { getSigninHandler } from "./routes/get-signin";
import { postNotebookHandler } from "./routes/post-notebook";
import { postSigninHandler } from "./routes/post-signin";
import { postSignoutHandler } from "./routes/post-signout";
import { getOneNotebookHandler } from "./routes/get-one-notebook";
import { getEditNotebookHandler } from "./routes/get-edit-notebook";
import { postEditNotebookHandler } from "./routes/post-edit-notebook";
import { deleteOneNotebookHandler } from "./routes/post-delete-notebook";

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
    import: join(__dirname, "./routes/get-signin"),
    action: getSigninHandler.name,
  },
  {
    method: "POST",
    path: "/signin",
    import: join(__dirname, "./routes/post-signin"),
    action: postSigninHandler.name,
  },
  {
    method: "POST",
    path: "/signout",
    import: join(__dirname, "./routes/post-signout"),
    action: postSignoutHandler.name,
  },
  {
    method: "GET",
    path: "/new-notebook",
    import: join(__dirname, "./routes/get-new-notebook"),
    action: getNewNotebookHandler.name,
  },
  {
    method: "POST",
    path: "/notebook",
    import: join(__dirname, "./routes/post-notebook"),
    action: postNotebookHandler.name,
  },
  {
    method: "GET",
    path: "/notebook/:notebookID",
    import: join(__dirname, "./routes/get-one-notebook"),
    action: getOneNotebookHandler.name,
  },
  {
    method: "GET",
    path: "/notebook/:notebookID/edit",
    import: join(__dirname, "./routes/get-edit-notebook"),
    action: getEditNotebookHandler.name,
  },
  {
    method: "POST",
    path: "/notebook/:notebookID/edit",
    import: join(__dirname, "./routes/post-edit-notebook"),
    action: postEditNotebookHandler.name,
  },
  {
    method: "POST",
    path: "/delete-notebook",
    import: join(__dirname, "./routes/post-delete-notebook"),
    action: deleteOneNotebookHandler.name,
  },
];
