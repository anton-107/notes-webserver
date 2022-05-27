import * as express from "express";
import * as cookieParser from "cookie-parser";
import { Express } from "express";
import {
  Authenticator,
  UserStore,
} from "authentication-module/src/authenticator";
import { Argon2HashingFunction } from "authentication-module/src/argon2-hashing";

interface NotesWebserverProperties {
  userStore: UserStore;
}

export class NotesWebserver {
  private app: Express;
  private server;

  constructor(properties: NotesWebserverProperties) {
    this.app = express();
    this.app.use(cookieParser());

    const authenticator = new Authenticator({
      userStore: properties.userStore,
      passwordHashingFunction: new Argon2HashingFunction(),
    });

    this.app.get("/home", (req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");

      const authToken = req.cookies["Authentication"];
      const user = authenticator.authenticate(authToken);

      if (!user.isAuthenticated) {
        res.send(
          "<h1>hello anonymous!</h1><a data-testid='sign-in-link' href='/signin'>Sign in</a>"
        );
        return;
      }

      res.send(`<h1>hello ${user.username}!</h1><a>Sign out</a>`);
    });
    this.app.get("/signin", (req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(`<form method='post' action='/signin'>
        <input name='user-login' data-testid='user-login' />
        <input name='user-password' data-testid='user-password' type='password' />
      </form>`);
    });
    this.app.post("/signin", (req, res) => {
      res.setHeader("Location", "/home");
      res.sendStatus(303);
    });
  }

  public listen(port: number): void {
    this.server = this.app.listen(port);
  }
  public stop() {
    this.server.close();
  }
}
