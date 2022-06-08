import { HttpResponse, HttpStatus, PostFormHttpHandler } from "../http";

export class SignoutAction {
  public async render(): Promise<HttpResponse> {
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

export const postSignoutHandler: PostFormHttpHandler =
  async (): Promise<HttpResponse> => {
    return await new SignoutAction().render();
  };
