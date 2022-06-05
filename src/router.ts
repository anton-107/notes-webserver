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

export interface HttpRequest {
  authenticationToken: string;
}

export interface PostFormRequest extends HttpRequest {
  postBody: { [key: string]: string };
}

export interface HttpResponseHeader {
  headerName: string;
  headerValue: string;
}

export enum HttpStatus {
  OK = 200,
  SEE_OTHER = 303,
}

export interface HttpResponse {
  headers: HttpResponseHeader[];
  body: string;
  status: HttpStatus;
}

export type RouteHandler = (r: HttpRequest) => Promise<HttpResponse>;
export type PostFormRouteHandler = (
  r: PostFormRequest
) => Promise<HttpResponse>;

export const routes: Route[] = [
  {
    method: "GET",
    path: "/home",
    import: join(__dirname, "./routes/get-home.ts"),
    action: getHomeHandler.name,
  },
  {
    method: "GET",
    path: "/signin",
    import: join(__dirname, "./routes/get-signin.ts"),
    action: getSigninHandler.name,
  },
  {
    method: "POST",
    path: "/signin",
    import: join(__dirname, "./routes/post-signin.ts"),
    action: postSigninHandler.name,
  },
  {
    method: "POST",
    path: "/signout",
    import: join(__dirname, "./routes/post-signout.ts"),
    action: postSignoutHandler.name,
  },
  {
    method: "GET",
    path: "/new-notebook",
    import: join(__dirname, "./routes/get-new-notebook.ts"),
    action: getNewNotebookHandler.name,
  },
  {
    method: "POST",
    path: "/notebook",
    import: join(__dirname, "./routes/post-notebook.ts"),
    action: postNotebookHandler.name,
  },
];
