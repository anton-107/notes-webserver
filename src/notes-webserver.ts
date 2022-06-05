import * as http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import { Express } from "express";
import bodyParser from "body-parser";
import {
  HttpResponse,
  PostFormRouteHandler,
  Route,
  RouteHandler,
} from "./router";

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
            const handler: RouteHandler = module[route.action];
            const response: HttpResponse = await handler({
              authenticationToken: req.cookies["Authentication"],
            });
            response.headers.forEach((h) => {
              res.setHeader(h.headerName, h.headerValue);
            });
            res.status(response.status);
            res.send(response.body);
          });
        case "POST":
          return this.app.post(
            route.path,
            bodyParser.urlencoded({ extended: true }),
            async (req, res) => {
              const module = await import(route.import);
              const handler: PostFormRouteHandler = module[route.action];
              const response: HttpResponse = await handler({
                authenticationToken: req.cookies["Authentication"],
                postBody: req.body,
              });
              response.headers.forEach((h) => {
                res.setHeader(h.headerName, h.headerValue);
              });
              res.sendStatus(response.status);
            }
          );
      }
    });
    this.app.post("/signout", async (req, res) => {
      res.clearCookie("Authentication");
      res.send(`<div data-testid='signout-complete'>You are signed out</div>`);
    });
    this.app.get("/new-notebook", (req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(`<form method='post' action='/notebook'>
        <input name='notebook-name' data-testid='notebook-name-input' />
        <input type='submit' />
      </form>`);
    });
  }

  public listen(port: number): void {
    this.server = this.app.listen(port);
  }
  public stop() {
    this.server.close();
  }
}
