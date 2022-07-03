import { Authenticator } from "authentication-module/dist/authenticator";
import { HttpRequestHandler, HttpResponse } from "../http/http";
import { NotebookStore } from "../stores/notebook-store";
interface NotebookEditPageProperties {
    authenticationToken: string;
    authenticator: Authenticator;
    notebookStore: NotebookStore;
    notebookID: string;
    baseUrl: string;
}
export declare class NotebookEditPage {
    private properties;
    constructor(properties: NotebookEditPageProperties);
    render(): Promise<HttpResponse>;
}
export declare const getEditNotebookHandler: HttpRequestHandler;
export {};
