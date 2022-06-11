import { Authenticator } from "authentication-module/dist/authenticator";
import { NotebookStore } from "./../notebook-store";
import { HttpResponse, HttpRequestHandler } from "../http/http";
interface HomePageProperties {
    authenticationToken: string;
    authenticator: Authenticator;
    notebookStore: NotebookStore;
    baseUrl: string;
}
export declare class HomePage {
    private properties;
    constructor(properties: HomePageProperties);
    render(): Promise<HttpResponse>;
}
export declare const getHomeHandler: HttpRequestHandler;
export {};
