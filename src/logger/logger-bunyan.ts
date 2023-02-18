import * as bunyan from "bunyan";

import { Logger, LoggerFields } from "./logger";

export class LoggerBunyan implements Logger {
  private logger = bunyan.createLogger({ name: "notes-webserver" });
  public info(message: string, data?: LoggerFields): void {
    this.logger.info(message, { msg: message, ...data });
  }
  public error(message: string, data?: LoggerFields): void {
    this.logger.error(message, { msg: message, ...data });
  }
}
