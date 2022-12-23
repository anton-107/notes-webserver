import { Authenticator } from "authentication-module/dist/authenticator";

import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse, HttpStatus } from "../../http/http";

interface IdentityPageProperties {
  authenticationToken: string;
  authenticator: Authenticator;
  corsHeaders: CORSHeaders;
}

export class IdentityPageController {
  constructor(private properties: IdentityPageProperties) {}

  public async render(): Promise<HttpResponse> {
    const authenticationResult =
      await this.properties.authenticator.authenticate(
        this.properties.authenticationToken
      );
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...this.properties.corsHeaders,
      },
      body: JSON.stringify({
        isAuthenticated: authenticationResult.isAuthenticated,
        username: authenticationResult.username,
      }),
    };
  }
}
