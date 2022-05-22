import * as express from "express";
import * as cookieParser from "cookie-parser";
import { Express } from "express";
import {
  Authenticator,
  UserStore,
} from "authentication-module/src/authenticator";

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
    });

    this.app.get("/home", (req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");

      const authToken = req.cookies["Authentication"];
      const user = authenticator.authenticate(authToken);

      if (!user.isAuthenticated) {
        res.send("<h1>hello anonymous!</h1><a>Sign in</a>");
        return;
      }

      res.send(`<h1>hello ${user.username}!</h1><a>Sign out</a>`);
    });
  }

  public listen(port: number): void {
    this.server = this.app.listen(port);
  }
  public stop() {
    this.server.close();
  }
}
