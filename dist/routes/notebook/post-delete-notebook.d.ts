import { Authenticator } from "authentication-module/dist/authenticator";
import { NotebookStore } from "../../stores/notebook-store";
import { HttpResponse, PostFormHttpHandler } from "../../http/http";
import { FormBody } from "../../http/body-parser";
interface DeleteNotebookActionProperties {
    authenticationToken: string;
    authenticator: Authenticator;
    notebookStore: NotebookStore;
    baseUrl: string;
}
export declare class DeleteNotebookAction {
    private properties;
    constructor(properties: DeleteNotebookActionProperties);
    render(form: FormBody): Promise<HttpResponse>;
}
export declare const deleteOneNotebookHandler: PostFormHttpHandler;
export {};
