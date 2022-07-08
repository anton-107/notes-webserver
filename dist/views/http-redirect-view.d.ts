import { HttpResponse } from "../http/http";
import { HtmlViewProperties } from "./interfaces";
export declare class HttpRedirectView {
    private properties;
    constructor(properties: HtmlViewProperties);
    showRedirect(location: string): HttpResponse;
}
