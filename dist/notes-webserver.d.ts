import { Route } from "./router";
interface NotesWebserverProperties {
    routes: Route[];
}
export declare class NotesWebserver {
    private app;
    private server;
    constructor(properties: NotesWebserverProperties);
    listen(port: number): void;
    stop(): void;
}
export {};
