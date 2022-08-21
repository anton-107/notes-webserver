import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse, PostFormHttpHandler } from "../../http/http";
interface SignoutControllerProperties {
    corsHeaders: CORSHeaders;
}
export declare class SignoutAction {
    private properties;
    constructor(properties: SignoutControllerProperties);
    render(): Promise<HttpResponse>;
}
export declare const postSignoutHandler: PostFormHttpHandler;
export {};
