import { HttpResponse, HttpStatus } from "../http/http";
import { HtmlViewProperties } from "./interfaces";

export class HttpRedirectView {
  constructor(private properties: HtmlViewProperties) {}
  public showRedirect(location: string): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.SEE_OTHER,
      headers: {
        Location: `${this.properties.baseUrl}${location}`,
      },
      body: "",
    };
  }
}
