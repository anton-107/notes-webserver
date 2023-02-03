import { PostFormRequest } from "./http";
export type FormBody = {
    [key: string]: string;
};
export declare function parseBody(request: PostFormRequest): FormBody;
