import { dependenciesConfiguration } from "../../configuration/configuration";
import { HttpRequestHandler, HttpResponse, HttpStatus } from "../../http/http";

interface SigninPageProperties {
  baseUrl: string;
}

export class SigninPage {
  constructor(private properties: SigninPageProperties) {}

  public async render(): Promise<HttpResponse> {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `<form method='post' action='${this.properties.baseUrl}/signin'>
        <input name='user-login' data-testid='user-login' />
        <input name='user-password' data-testid='user-password' type='password' />
        <input type='submit' />
      </form>`,
    };
  }
}

export const getSigninHandler: HttpRequestHandler =
  async (): Promise<HttpResponse> => {
    return await new SigninPage({ ...dependenciesConfiguration({}) }).render();
  };
