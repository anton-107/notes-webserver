import { Authenticator } from "authentication-module/dist/authenticator";
import { HttpResponse, PostFormRouteHandler } from "../router";
interface SigninActionProperties {
    authenticationToken: string;
    authenticator: Authenticator;
}
export declare class SigninAction {
    private properties;
    constructor(properties: SigninActionProperties);
    render(form: {
        [key: string]: string;
    }): Promise<HttpResponse>;
}
export declare const postSigninHandler: PostFormRouteHandler;
export {};
