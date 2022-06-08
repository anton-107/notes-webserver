import { Authenticator } from "authentication-module/dist/authenticator";
import { NotebookStore } from "../notebook-store";
import { HttpResponse, PostFormHttpHandler } from "../http";
interface CreateNotebookActionProperties {
    authenticationToken: string;
    authenticator: Authenticator;
    notebookStore: NotebookStore;
}
export declare class CreateNotebookAction {
    private properties;
    constructor(properties: CreateNotebookActionProperties);
    render(form: {
        [key: string]: string;
    }): Promise<HttpResponse>;
}
export declare const postNotebookHandler: PostFormHttpHandler;
export {};
