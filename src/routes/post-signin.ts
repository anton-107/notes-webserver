import { Authenticator } from "authentication-module/dist/authenticator";
import { dependenciesConfiguration } from "../configuration/configuration";
import {
  HttpResponse,
  HttpStatus,
  PostFormRequest,
  PostFormHttpHandler,
} from "../http";

interface SigninActionProperties {
  authenticationToken: string;
  authenticator: Authenticator;
}

export class SigninAction {
  constructor(private properties: SigninActionProperties) {}
  public async render(form: { [key: string]: string }): Promise<HttpResponse> {
    const signinResult = await this.properties.authenticator.signIn(
      form["user-login"],
      form["user-password"]
    );
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.SEE_OTHER,
      headers: {
        Location: "/home",
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
    authenticationToken: request.authenticationToken,
    ...dependenciesConfiguration(),
  }).render(request.postBody);
};
