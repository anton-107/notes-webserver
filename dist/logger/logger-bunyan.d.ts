import { Logger, LoggerFields } from "./logger";
export declare class LoggerBunyan implements Logger {
    private logger;
    info(message: string, data?: LoggerFields): void;
    error(message: string, data?: LoggerFields): void;
}
