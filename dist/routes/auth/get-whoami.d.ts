import { Authenticator } from "authentication-module/dist/authenticator";
import { HttpResponse, HttpRequestHandler } from "../../http/http";
interface IdentityPageProperties {
    authenticationToken: string;
    authenticator: Authenticator;
}
export declare class IdentityPage {
    private properties;
    constructor(properties: IdentityPageProperties);
    render(): Promise<HttpResponse>;
}
export declare const getWhoamiHandler: HttpRequestHandler;
export {};
