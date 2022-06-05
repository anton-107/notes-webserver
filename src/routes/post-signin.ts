import { Authenticator } from "authentication-module/dist/authenticator";
import { dependenciesConfiguration } from "../configuration/configuration";
import {
  HttpResponse,
  HttpStatus,
  PostFormRequest,
  PostFormRouteHandler,
} from "../router";

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
      status: HttpStatus.SEE_OTHER,
      headers: [
        {
          headerName: "Location",
          headerValue: "/home",
        },
        {
          headerName: "Set-Cookie",
          headerValue: `Authentication=${signinResult.accessToken}`,
        },
      ],
      body: "",
    };
  }
}

export const postSigninHandler: PostFormRouteHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  return await new SigninAction({
    authenticationToken: request.authenticationToken,
    ...dependenciesConfiguration(),
  }).render(request.postBody);
};
