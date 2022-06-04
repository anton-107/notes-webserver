import * as http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import { Express } from "express";
import bodyParser from "body-parser";
import { Authenticator } from "authentication-module/dist/authenticator";
import { NotebookStore } from "./notebook-store";
import { HttpResponse, Route, RouteHandler } from "./router";

interface NotesWebserverProperties {
  authenticator: Authenticator;
  notebookStore: NotebookStore;
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
            res.send(response.body);
          });
      }
    });

    this.app.get("/signin", (req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(`<form method='post' action='/signin'>
        <input name='user-login' data-testid='user-login' />
        <input name='user-password' data-testid='user-password' type='password' />
        <input type='submit' />
      </form>`);
    });
    this.app.post(
      "/signin",
      bodyParser.urlencoded({ extended: true }),
      async (req, res) => {
        const signinResult = await properties.authenticator.signIn(
          req.body["user-login"],
          req.body["user-password"]
        );
        res.cookie("Authentication", signinResult.accessToken);
        res.setHeader("Location", "/home");
        res.sendStatus(303);
      }
    );
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
    this.app.post(
      "/notebook",
      bodyParser.urlencoded({ extended: true }),
      async (req, res) => {
        const authToken = req.cookies["Authentication"];
        const user = await properties.authenticator.authenticate(authToken);
        await properties.notebookStore.add({
          name: req.body["notebook-name"],
          owner: user.username,
        });
        res.setHeader("Location", "/home");
        res.sendStatus(303);
      }
    );
  }

  public listen(port: number): void {
    this.server = this.app.listen(port);
  }
  public stop() {
    this.server.close();
  }
}
