export interface HttpRequest {
  authenticationToken: string;
  headers: { [key: string]: string | string[] };
}

export interface PostFormRequest extends HttpRequest {
  body: string;
}

export enum HttpStatus {
  OK = 200,
  SEE_OTHER = 303,
}

export interface HttpResponse {
  isBase64Encoded: boolean;
  headers: { [name: string]: string };
  body: string;
  statusCode: HttpStatus;
}

export type HttpRequestHandler = (r: HttpRequest) => Promise<HttpResponse>;
export type PostFormHttpHandler = (r: PostFormRequest) => Promise<HttpResponse>;
