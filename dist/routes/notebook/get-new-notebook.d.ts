import { HttpResponse, HttpRequestHandler } from "../../http/http";
interface NewNotebookPageProperties {
    baseUrl: string;
}
export declare class NewNotebookPage {
    private properties;
    constructor(properties: NewNotebookPageProperties);
    render(): Promise<HttpResponse>;
}
export declare const getNewNotebookHandler: HttpRequestHandler;
export {};
