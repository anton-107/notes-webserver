import { Authenticator } from "authentication-module/dist/authenticator";

import { CORSHeaders } from "../../http/cors-headers";
import { HttpRequestHandler,HttpResponse } from "../../http/http";
interface IdentityPageProperties {
    authenticationToken: string;
    authenticator: Authenticator;
    corsHeaders: CORSHeaders;
}
export declare class IdentityPage {
    private properties;
    constructor(properties: IdentityPageProperties);
    render(): Promise<HttpResponse>;
}
export declare const getWhoamiHandler: HttpRequestHandler;
export {};
