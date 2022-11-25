export interface LoggerFields {
  username?: string;
  owner?: string;
  entityID?: string;
  error?: Error;
  objectSize?: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export interface Logger {
  info(message: string, data?: LoggerFields): void;
  error(message: string, data?: LoggerFields): void;
}
