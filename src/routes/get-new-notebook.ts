import { HttpResponse, HttpStatus, RouteHandler } from "../router";

export class NewNotebookPage {
  public async render(): Promise<HttpResponse> {
    return {
      status: HttpStatus.OK,
      headers: [],
      body: `<form method='post' action='/notebook'>
        <input name='notebook-name' data-testid='notebook-name-input' />
        <input type='submit' />
      </form>`,
    };
  }
}

export const getNewNotebookHandler: RouteHandler =
  async (): Promise<HttpResponse> => {
    return await new NewNotebookPage().render();
  };
