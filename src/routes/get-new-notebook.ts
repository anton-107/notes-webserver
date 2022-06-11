import { dependenciesConfiguration } from "../configuration/configuration";
import { HttpResponse, HttpStatus, HttpRequestHandler } from "../http/http";

interface NewNotebookPageProperties {
  baseUrl: string;
}

export class NewNotebookPage {
  constructor(private properties: NewNotebookPageProperties) {}
  public async render(): Promise<HttpResponse> {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `<form method='post' action='${this.properties.baseUrl}/notebook'>
        <input name='notebook-name' data-testid='notebook-name-input' />
        <input type='submit' />
      </form>`,
    };
  }
}

export const getNewNotebookHandler: HttpRequestHandler =
  async (): Promise<HttpResponse> => {
    return await new NewNotebookPage({
      ...dependenciesConfiguration({}),
    }).render();
  };
