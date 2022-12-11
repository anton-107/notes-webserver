import { CORSHeaders } from "./http/cors-headers";
import { Route } from "./router";
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
    private handleGetRequest;
    private handlePostRequest;
    private parsedQSToMap;
}
export {};
