import { HttpResponse, HttpStatus, HttpRequestHandler } from "../http";

export class NewNotebookPage {
  public async render(): Promise<HttpResponse> {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {},
      body: `<form method='post' action='/notebook'>
        <input name='notebook-name' data-testid='notebook-name-input' />
        <input type='submit' />
      </form>`,
    };
  }
}

export const getNewNotebookHandler: HttpRequestHandler =
  async (): Promise<HttpResponse> => {
    return await new NewNotebookPage().render();
  };
