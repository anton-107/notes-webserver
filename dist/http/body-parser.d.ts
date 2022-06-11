import { PostFormRequest } from "./http";
export declare type FormBody = {
    [key: string]: string;
};
export declare function parseBody(request: PostFormRequest): FormBody;
