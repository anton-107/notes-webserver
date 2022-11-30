import { Authenticator } from "authentication-module/dist/authenticator";
import { FormBody } from "../../http/body-parser";
import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse } from "../../http/http";
import { ResponseType } from "../../http/response-type-parser";
import { Logger } from "../../logger/logger";
interface SigninControllerProperties {
    logger: Logger;
    authenticationToken: string;
    authenticator: Authenticator;
    baseUrl: string;
    responseType: ResponseType;
    corsHeaders: CORSHeaders;
}
export declare class SigninController {
    private properties;
    constructor(properties: SigninControllerProperties);
    render(form: FormBody): Promise<HttpResponse>;
}
export {};
