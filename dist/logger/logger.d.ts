export interface LoggerFields {
    username?: string;
    owner?: string;
    entityID?: string;
    error?: Error;
    objectSize?: number;
    data?: any;
}
export interface Logger {
    info(message: string, data?: LoggerFields): void;
    error(message: string, data?: LoggerFields): void;
}
