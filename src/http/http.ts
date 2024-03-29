export type HttpHeaders = { [key: string]: string | string[] };
export type QueryStringParameters = { [key: string]: string | undefined };

export interface HttpRequest {
  headers: HttpHeaders;
  pathParameters: { [key: string]: string };
  queryStringParameters: QueryStringParameters;
}

export interface PostFormRequest extends HttpRequest {
  body: string;
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  SEE_OTHER = 303,
  FORBIDDEN = 403,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export interface HttpResponse {
  isBase64Encoded: boolean;
  headers: { [name: string]: string };
  body: string;
  statusCode: HttpStatus;
}

export type HttpRequestHandler = (r: HttpRequest) => Promise<HttpResponse>;
export type PostFormHttpHandler = (r: PostFormRequest) => Promise<HttpResponse>;
