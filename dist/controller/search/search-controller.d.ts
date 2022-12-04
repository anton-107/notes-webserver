import { Authenticator } from "authentication-module/dist/authenticator";
import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse } from "../../http/http";
import { Logger } from "../../logger/logger";
import { SearchStore } from "../../stores/search/search-store";
interface SearchControllerProperties {
    logger: Logger;
    authenticationToken: string;
    authenticator: Authenticator;
    searchStore: SearchStore;
    corsHeaders: CORSHeaders;
}
export declare class SearchController {
    private properties;
    constructor(properties: SearchControllerProperties);
    search(keyword: string): Promise<HttpResponse>;
}
export {};
