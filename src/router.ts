import { join } from "path";
import { handler } from "./routes/get-home";

export interface Route {
  method: "GET" | "POST";
  path: string;
  import: string;
  action: string;
}

export interface HttpRequest {
  authenticationToken: string;
}

export interface HttpResponseHeader {
  headerName: string;
  headerValue: string;
}

export interface HttpResponse {
  headers: HttpResponseHeader[];
  body: string;
}

export type RouteHandler = (r: HttpRequest) => Promise<HttpResponse>;

export const routes: Route[] = [
  {
    method: "GET",
    path: "/home",
    import: join(__dirname, "./routes/get-home.ts"),
    action: handler.name,
  },
];
