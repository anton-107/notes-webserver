import { Authenticator } from "authentication-module/dist/authenticator";
import { HttpRequestHandler, HttpResponse } from "../../http/http";
import { NotebookStore } from "../../stores/notebook-store";
interface NotebookDetailsPageProperties {
    authenticationToken: string;
    authenticator: Authenticator;
    notebookStore: NotebookStore;
    notebookID: string;
    baseUrl: string;
}
export declare class NotebookDetailsPage {
    private properties;
    constructor(properties: NotebookDetailsPageProperties);
    render(): Promise<HttpResponse>;
}
export declare const getOneNotebookHandler: HttpRequestHandler;
export {};
