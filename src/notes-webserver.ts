import * as express from "express";
import * as cookieParser from "cookie-parser";
import { Express } from "express";
import * as bodyParser from "body-parser";
import {
  Authenticator,
  UserStore,
} from "authentication-module/src/authenticator";
import { Argon2HashingFunction } from "authentication-module/src/argon2-hashing";
import { JWTSerializer } from "authentication-module/src/jwt-serializer";

interface NotesWebserverProperties {
  userStore: UserStore;
  jwtSerializerSecretKey: string;
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
      authTokensSerializer: new JWTSerializer(
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

      res.send(
        `<h1 data-testid='user-greeting'>hello ${user.username}!</h1><form method='post' action='/signout'><button type='submit' data-testid='sign-out-button'>Sign out</button></form>`
      );
    });
    this.app.get("/signin", (req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(`<form method='post' action='/signin'>
        <input name='user-login' data-testid='user-login' />
        <input name='user-password' data-testid='user-password' type='password' />
      </form>`);
    });
    this.app.post("/signin", bodyParser.urlencoded(), async (req, res) => {
      const signinResult = await authenticator.signIn(
        req.body["user-login"],
        req.body["user-password"]
      );
      res.cookie("Authentication", signinResult.accessToken);
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
