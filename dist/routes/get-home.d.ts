import { Authenticator } from "authentication-module/dist/authenticator";
import { NotebookStore } from "../stores/notebook/notebook-store";
import { HttpResponse, HttpRequestHandler } from "../http/http";
import { PersonStore } from "../stores/person/person-store";
interface HomePageProperties {
    authenticationToken: string;
    authenticator: Authenticator;
    notebookStore: NotebookStore;
    personStore: PersonStore;
    baseUrl: string;
}
export declare class HomePage {
    private properties;
    constructor(properties: HomePageProperties);
    render(): Promise<HttpResponse>;
}
export declare const getHomeHandler: HttpRequestHandler;
export {};
