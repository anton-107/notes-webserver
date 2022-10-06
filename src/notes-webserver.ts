import * as http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import { Express } from "express";
import {
  HttpResponse,
  PostFormHttpHandler,
  HttpRequestHandler,
} from "./http/http";
import { Route } from "./router";
import bodyParser from "body-parser";
import cors from "cors";
import { CORSHeaders } from "./http/cors-headers";

interface NotesWebserverProperties {
  routes: Route[];
  corsHeaders: CORSHeaders;
}

export class NotesWebserver {
  private app: Express;
  private server: http.Server;

  constructor(properties: NotesWebserverProperties) {
    this.app = express();
    this.app.use(
      cors({
        origin: properties.corsHeaders["Access-Control-Allow-Origin"],
        credentials: true,
      })
    );
    this.app.use(cookieParser());

    properties.routes.forEach((route) => {
      switch (route.method) {
        case "GET":
          return this.app.get(route.path, async (req, res) => {
            const module = await import(route.import);
            const handler: HttpRequestHandler = module[route.action];
            const response: HttpResponse = await handler({
              headers: req.headers,
              pathParameters: req.params,
            });
            Object.keys(response.headers).forEach((k) => {
              res.setHeader(k, response.headers[k]);
            });
            res.status(response.statusCode);
            res.send(response.body);
          });
        case "POST":
          return this.app.post(
            route.path,
            bodyParser.raw({ type: () => true }),
            async (req, res) => {
              const module = await import(route.import);
              const handler: PostFormHttpHandler = module[route.action];
              const response: HttpResponse = await handler({
                body: req.body.toString("utf-8"),
                headers: req.headers,
                pathParameters: req.params,
              });
              Object.keys(response.headers).forEach((k) => {
                res.setHeader(k, response.headers[k]);
              });
              res.status(response.statusCode);
              res.send(response.body);
            }
          );
      }
    });
  }

  public listen(port: number): void {
    this.server = this.app.listen(port);
  }
  public stop() {
    this.server.close();
  }
}
