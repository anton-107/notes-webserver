export interface HttpRequest {
    authenticationToken: string;
}
export interface PostFormRequest extends HttpRequest {
    postBody: {
        [key: string]: string;
    };
}
export interface HttpResponseHeader {
    headerName: string;
    headerValue: string;
}
export declare enum HttpStatus {
    OK = 200,
    SEE_OTHER = 303
}
export interface HttpResponse {
    headers: HttpResponseHeader[];
    body: string;
    status: HttpStatus;
}
export declare type HttpRequestHandler = (r: HttpRequest) => Promise<HttpResponse>;
export declare type PostFormHttpHandler = (r: PostFormRequest) => Promise<HttpResponse>;
