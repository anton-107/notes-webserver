import { HttpResponse, HttpStatus } from "../http/http";

export class HttpForbiddenView {
  public showForbidden(): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.FORBIDDEN,
      headers: {},
      body: "Forbidden.",
    };
  }
}
