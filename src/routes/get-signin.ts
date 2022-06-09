import { HttpResponse, HttpStatus, HttpRequestHandler } from "../http";

export class SigninPage {
  public async render(): Promise<HttpResponse> {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `<form method='post' action='/signin'>
        <input name='user-login' data-testid='user-login' />
        <input name='user-password' data-testid='user-password' type='password' />
        <input type='submit' />
      </form>`,
    };
  }
}

export const getSigninHandler: HttpRequestHandler =
  async (): Promise<HttpResponse> => {
    return await new SigninPage().render();
  };
