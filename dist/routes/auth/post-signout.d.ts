import { HttpResponse, PostFormHttpHandler } from "../../http/http";
export declare class SignoutAction {
    render(): Promise<HttpResponse>;
}
export declare const postSignoutHandler: PostFormHttpHandler;
