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
      status: HttpStatus.OK,
      headers: [
        {
          headerName: "Set-Cookie",
          headerValue: `Authentication=;Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        },
      ],
      body: "<div data-testid='signout-complete'>You are signed out</div>",
    };
  }
}

export const postSignoutHandler: PostFormRouteHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  return await new SigninAction({
    authenticationToken: request.authenticationToken,
    ...dependenciesConfiguration(),
  }).render(request.postBody);
};
