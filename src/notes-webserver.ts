import * as express from "express";
import * as cookieParser from "cookie-parser";
import { Express } from "express";

export class NotesWebserver {
  private app: Express;
  private server;

  constructor() {
    this.app = express();
    this.app.use(cookieParser());
    this.app.get("/home", (req, res) => {
      console.log('RequestCookies: ', req.cookies);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send("<h1>hello anonymous!</h1><a>Sign in</a>");
    });
  }

  public listen(port: number): void {
    this.server = this.app.listen(port);
  }
  public stop() {
    this.server.close();
  }
}
