import { HttpResponse, HttpStatus, PostFormHttpHandler } from "../http/http";

export class SignoutAction {
  public async render(): Promise<HttpResponse> {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Set-Cookie": `Authentication=;Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      },
      body: "<div data-testid='signout-complete'>You are signed out</div>",
    };
  }
}

export const postSignoutHandler: PostFormHttpHandler =
  async (): Promise<HttpResponse> => {
    return await new SignoutAction().render();
  };
