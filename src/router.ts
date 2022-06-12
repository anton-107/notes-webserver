import { join } from "path";
import { getHomeHandler } from "./routes/get-home";
import { getNewNotebookHandler } from "./routes/get-new-notebook";
import { getSigninHandler } from "./routes/get-signin";
import { postNotebookHandler } from "./routes/post-notebook";
import { postSigninHandler } from "./routes/post-signin";
import { postSignoutHandler } from "./routes/post-signout";

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
];