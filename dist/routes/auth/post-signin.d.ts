import { Authenticator } from "authentication-module/dist/authenticator";
import { FormBody } from "../../http/body-parser";
import { HttpResponse, PostFormHttpHandler } from "../../http/http";
interface SigninActionProperties {
    authenticationToken: string;
    authenticator: Authenticator;
    baseUrl: string;
}
export declare class SigninAction {
    private properties;
    constructor(properties: SigninActionProperties);
    render(form: FormBody): Promise<HttpResponse>;
}
export declare const postSigninHandler: PostFormHttpHandler;
export {};
