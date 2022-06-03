import * as http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import { Express } from "express";
import bodyParser from "body-parser";
import {
  Authenticator,
  UserStore,
} from "authentication-module/dist/authenticator";
import { Argon2HashingFunction } from "authentication-module/dist/argon2-hashing";
import {
  JWTSerializer,
  StandardJwtImplementation,
} from "authentication-module/dist/jwt-serializer";
import { NotebookStore } from "./notebook-store";

interface NotesWebserverProperties {
  userStore: UserStore;
  notebookStore: NotebookStore;
  jwtSerializerSecretKey: string;
}

export class NotesWebserver {
  private app: Express;
  private server: http.Server;

  constructor(properties: NotesWebserverProperties) {
    this.app = express();
    this.app.use(cookieParser());

    const authenticator = new Authenticator({
      userStore: properties.userStore,
      passwordHashingFunction: new Argon2HashingFunction(),
      authTokensSerializer: new JWTSerializer(
        new StandardJwtImplementation(),
        properties.jwtSerializerSecretKey
      ),
    });

    this.app.get("/home", async (req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");

      const responseToAnonymous =
        "<h1>hello anonymous!</h1><a data-testid='sign-in-link' href='/signin'>Sign in</a>";

      const authToken = req.cookies["Authentication"];
      if (!authToken) {
        res.send(responseToAnonymous);
        return;
      }

      const user = await authenticator.authenticate(authToken);
      if (!user.isAuthenticated) {
        res.send(responseToAnonymous);
        return;
      }

      const notebooks = await properties.notebookStore.listAll(user.username);

      res.send(
        `<h1 data-testid='user-greeting'>hello ${user.username}!</h1>
        <form method='post' action='/signout'><button type='submit' data-testid='sign-out-button'>Sign out</button></form>
        <a href='/new-notebook' data-testid='create-new-notebook-link'>Create new notebook</a>
        ${notebooks.map(
          (x) => `<div><span data-testid='notebook-name'>${x.name}</span></div>`
        )}
        `
      );
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
        const signinResult = await authenticator.signIn(
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
        const user = await authenticator.authenticate(authToken);
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
