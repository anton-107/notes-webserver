import { HttpResponse, HttpStatus } from "../http/http";

export class HttpBadRequestView {
  public showBadRequest(): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.BAD_REQUEST,
      headers: {},
      body: "Bad request.",
    };
  }
}
