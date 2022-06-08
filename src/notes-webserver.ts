import * as http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import { Express } from "express";
import bodyParser from "body-parser";
import { HttpResponse, PostFormHttpHandler, HttpRequestHandler } from "./http";
import { Route } from "./router";

interface NotesWebserverProperties {
  routes: Route[];
}

export class NotesWebserver {
  private app: Express;
  private server: http.Server;

  constructor(properties: NotesWebserverProperties) {
    this.app = express();
    this.app.use(cookieParser());

    properties.routes.forEach((route) => {
      switch (route.method) {
        case "GET":
          return this.app.get(route.path, async (req, res) => {
            const module = await import(route.import);
            const handler: HttpRequestHandler = module[route.action];
            const response: HttpResponse = await handler({
              authenticationToken: req.cookies["Authentication"],
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
            bodyParser.urlencoded({ extended: true }),
            async (req, res) => {
              const module = await import(route.import);
              const handler: PostFormHttpHandler = module[route.action];
              const response: HttpResponse = await handler({
                authenticationToken: req.cookies["Authentication"],
                postBody: req.body,
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
