import { HttpHeaders } from "./http";
export declare enum ResponseType {
    JSON = "json",
    HTML = "html"
}
export declare function parseResponseType(headers: HttpHeaders): ResponseType;
