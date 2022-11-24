import { Authenticator } from "authentication-module/dist/authenticator";

import { FormBody } from "../../http/body-parser";
import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse, HttpStatus } from "../../http/http";
import { ResponseType } from "../../http/response-type-parser";

interface SigninControllerProperties {
  authenticationToken: string;
  authenticator: Authenticator;
  baseUrl: string;
  responseType: ResponseType;
  corsHeaders: CORSHeaders;
}

export class SigninController {
  constructor(private properties: SigninControllerProperties) {}
  public async render(form: FormBody): Promise<HttpResponse> {
    console.log("signin attempt", form["user-login"]);
    const signinResult = await this.properties.authenticator.signIn(
      form["user-login"],
      form["user-password"]
    );
    console.log(
      "signin result",
      signinResult.isAuthenticated,
      signinResult.authenticationFailedReason
    );
    if (this.properties.responseType === ResponseType.JSON) {
      return {
        isBase64Encoded: false,
        statusCode: signinResult.isAuthenticated
          ? HttpStatus.OK
          : HttpStatus.FORBIDDEN,
        headers: {
          "Set-Cookie": `Authentication=${signinResult.accessToken};SameSite=None;Secure`,
          ...this.properties.corsHeaders,
        },
        body: JSON.stringify({
          isAuthenticated: signinResult.isAuthenticated,
        }),
      };
    }
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.SEE_OTHER,
      headers: {
        Location: `${this.properties.baseUrl}/home`,
        "Set-Cookie": `Authentication=${signinResult.accessToken}`,
      },
      body: "",
    };
  }
}
