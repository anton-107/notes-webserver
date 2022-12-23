import { HttpHeaders } from "../../http/http";
import { ResponseType } from "../../http/response-type-parser";
import { NoteController } from "./note-controller";
interface NoteControllerBuilderProperties {
    headers: HttpHeaders;
    responseType: ResponseType;
    notebookID?: string;
    noteType?: string;
}
export declare class NoteControllerBuilder {
    static build(properties: NoteControllerBuilderProperties): NoteController;
}
export {};
