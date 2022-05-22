import * as express from "express";
import { Express } from "express";

export class NotesWebserver {
  private app: Express;
  private server;

  constructor() {
    this.app = express();
    this.app.get("/home", (req, res) => {
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
