import { Authenticator } from "authentication-module/dist/authenticator";
import { HttpResponse } from "../../http/http";
import { Logger } from "../../logger/logger";
import { NotebookStore } from "../../stores/notebook/notebook-store";
import { PersonStore } from "../../stores/person/person-store";
interface HomePageProperties {
    logger: Logger;
    authenticationToken: string;
    authenticator: Authenticator;
    notebookStore: NotebookStore;
    personStore: PersonStore;
    baseUrl: string;
}
export declare class HomePageController {
    private properties;
    constructor(properties: HomePageProperties);
    render(): Promise<HttpResponse>;
}
export {};
