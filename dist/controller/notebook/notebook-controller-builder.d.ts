import { HttpHeaders } from "../../http/http";
import { ResponseType } from "../../http/response-type-parser";
import { NotebookController } from "./notebook-controller";
interface NotebookControllerBuilderProperties {
    headers: HttpHeaders;
    responseType: ResponseType;
}
export declare class NotebookControllerBuilder {
    static build(properties: NotebookControllerBuilderProperties): NotebookController;
}
export {};
