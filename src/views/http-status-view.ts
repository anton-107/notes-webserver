import { HttpResponse, HttpStatus } from "../http/http";

export class HttpStatusView {
  public showJSONCreated(): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.CREATED,
      headers: {},
      body: JSON.stringify({ message: "created" }),
    };
  }
  public showNotFound(): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.NOT_FOUND,
      headers: {},
      body: "Not found.",
    };
  }
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
