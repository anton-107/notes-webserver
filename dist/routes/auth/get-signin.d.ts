import { HttpRequestHandler, HttpResponse } from "../../http/http";
interface SigninPageProperties {
    baseUrl: string;
}
export declare class SigninPage {
    private properties;
    constructor(properties: SigninPageProperties);
    render(): Promise<HttpResponse>;
}
export declare const getSigninHandler: HttpRequestHandler;
export {};
