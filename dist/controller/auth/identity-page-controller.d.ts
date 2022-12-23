import { Authenticator } from "authentication-module/dist/authenticator";
import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse } from "../../http/http";
interface IdentityPageProperties {
    authenticationToken: string;
    authenticator: Authenticator;
    corsHeaders: CORSHeaders;
}
export declare class IdentityPageController {
    private properties;
    constructor(properties: IdentityPageProperties);
    render(): Promise<HttpResponse>;
}
export {};
