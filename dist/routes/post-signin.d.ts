import { Authenticator } from "authentication-module/dist/authenticator";
import { HttpResponse, PostFormHttpHandler } from "../http";
interface SigninActionProperties {
    authenticationToken: string;
    authenticator: Authenticator;
    baseUrl: string;
}
export declare class SigninAction {
    private properties;
    constructor(properties: SigninActionProperties);
    render(form: {
        [key: string]: string;
    }): Promise<HttpResponse>;
}
export declare const postSigninHandler: PostFormHttpHandler;
export {};
