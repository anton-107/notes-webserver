import { HttpResponse, HttpStatus, RouteHandler } from "../router";

export class SigninPage {
  public async render(): Promise<HttpResponse> {
    return {
      status: HttpStatus.OK,
      headers: [],
      body: `<form method='post' action='/signin'>
        <input name='user-login' data-testid='user-login' />
        <input name='user-password' data-testid='user-password' type='password' />
        <input type='submit' />
      </form>`,
    };
  }
}

export const getSigninHandler: RouteHandler =
  async (): Promise<HttpResponse> => {
    return await new SigninPage().render();
  };
