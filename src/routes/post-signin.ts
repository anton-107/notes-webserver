import { Authenticator } from "authentication-module/dist/authenticator";
import { dependenciesConfiguration } from "../configuration/configuration";
import { FormBody, parseBody } from "../http/body-parser";
import { parseCookie } from "../http/cookie-parser";
import {
  HttpResponse,
  HttpStatus,
  PostFormRequest,
  PostFormHttpHandler,
} from "../http/http";

interface SigninActionProperties {
  authenticationToken: string;
  authenticator: Authenticator;
  baseUrl: string;
}

export class SigninAction {
  constructor(private properties: SigninActionProperties) {}
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

export const postSigninHandler: PostFormHttpHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  return await new SigninAction({
    authenticationToken: parseCookie(request.headers, "Authentication"),
    ...dependenciesConfiguration({}),
  }).render(parseBody(request));
};
