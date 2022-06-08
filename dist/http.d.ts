export interface HttpRequest {
    authenticationToken: string;
}
export interface PostFormRequest extends HttpRequest {
    postBody: {
        [key: string]: string;
    };
}
export declare enum HttpStatus {
    OK = 200,
    SEE_OTHER = 303
}
export interface HttpResponse {
    isBase64Encoded: boolean;
    headers: {
        [name: string]: string;
    };
    body: string;
    statusCode: HttpStatus;
}
export declare type HttpRequestHandler = (r: HttpRequest) => Promise<HttpResponse>;
export declare type PostFormHttpHandler = (r: PostFormRequest) => Promise<HttpResponse>;
