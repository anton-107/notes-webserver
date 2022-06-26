export type HttpHeaders = { [key: string]: string | string[] };
export interface HttpRequest {
  headers: HttpHeaders;
  params: { [key: string]: string };
}

export interface PostFormRequest extends HttpRequest {
  body: string;
}

export enum HttpStatus {
  OK = 200,
  SEE_OTHER = 303,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

export interface HttpResponse {
  isBase64Encoded: boolean;
  headers: { [name: string]: string };
  body: string;
  statusCode: HttpStatus;
}

export type HttpRequestHandler = (r: HttpRequest) => Promise<HttpResponse>;
export type PostFormHttpHandler = (r: PostFormRequest) => Promise<HttpResponse>;
