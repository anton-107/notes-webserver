export declare type HttpHeaders = {
    [key: string]: string | string[];
};
export interface HttpRequest {
    headers: HttpHeaders;
    pathParameters: {
        [key: string]: string;
    };
}
export interface PostFormRequest extends HttpRequest {
    body: string;
}
export declare enum HttpStatus {
    OK = 200,
    SEE_OTHER = 303,
    FORBIDDEN = 403,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
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
