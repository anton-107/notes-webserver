import { Route } from "./router";
import { CORSHeaders } from "./http/cors-headers";
interface NotesWebserverProperties {
    routes: Route[];
    corsHeaders: CORSHeaders;
}
export declare class NotesWebserver {
    private app;
    private server;
    constructor(properties: NotesWebserverProperties);
    listen(port: number): void;
    stop(): void;
}
export {};
