import { HttpResponse, HttpStatus } from "../http/http";

export class HttpStatusView {
  public showForbidden(): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.FORBIDDEN,
      headers: {},
      body: "Forbidden.",
    };
  }
  public showInternalServerError(): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      headers: {},
      body: "Internal server error.",
    };
  }
}
