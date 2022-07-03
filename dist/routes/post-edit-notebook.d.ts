import { Authenticator } from "authentication-module/dist/authenticator";
import { NotebookStore } from "../stores/notebook-store";
import { HttpResponse, PostFormHttpHandler } from "../http/http";
import { FormBody } from "../http/body-parser";
interface EditNotebookActionProperties {
    authenticationToken: string;
    authenticator: Authenticator;
    notebookStore: NotebookStore;
    baseUrl: string;
}
export declare class EditNotebookAction {
    private properties;
    constructor(properties: EditNotebookActionProperties);
    render(form: FormBody): Promise<HttpResponse>;
}
export declare const postEditNotebookHandler: PostFormHttpHandler;
export {};
