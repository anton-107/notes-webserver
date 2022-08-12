import { Authenticator } from "authentication-module/dist/authenticator";
import { FormBody } from "../../http/body-parser";
import { HttpResponse } from "../../http/http";
import { ResponseType } from "../../http/response-type-parser";
interface SigninControllerProperties {
    authenticationToken: string;
    authenticator: Authenticator;
    baseUrl: string;
    responseType: ResponseType;
}
export declare class SigninController {
    private properties;
    constructor(properties: SigninControllerProperties);
    render(form: FormBody): Promise<HttpResponse>;
}
export {};
