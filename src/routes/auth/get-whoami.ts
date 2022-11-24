import { Authenticator } from "authentication-module/dist/authenticator";

import { dependenciesConfiguration } from "../../configuration/configuration";
import { parseCookie } from "../../http/cookie-parser";
import { CORSHeaders } from "../../http/cors-headers";
import {
  HttpRequest,
  HttpRequestHandler,
  HttpResponse,
  HttpStatus,
} from "../../http/http";

interface IdentityPageProperties {
  authenticationToken: string;
  authenticator: Authenticator;
  corsHeaders: CORSHeaders;
}

export class IdentityPage {
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

export const getWhoamiHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  return await new IdentityPage({
    authenticationToken: parseCookie(request.headers, "Authentication"),
    ...dependenciesConfiguration({}),
  }).render();
};
