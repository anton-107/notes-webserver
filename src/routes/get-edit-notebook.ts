import { Authenticator } from "authentication-module/dist/authenticator";
import { dependenciesConfiguration } from "../configuration/configuration";
import { parseCookie } from "../http/cookie-parser";
import {
  HttpRequest,
  HttpRequestHandler,
  HttpResponse,
  HttpStatus,
} from "../http/http";
import { NotebookStore } from "../stores/notebook-store";

interface NotebookEditPageProperties {
  authenticationToken: string;
  authenticator: Authenticator;
  notebookStore: NotebookStore;
  notebookID: string;
  baseUrl: string;
}

export class NotebookEditPage {
  constructor(private properties: NotebookEditPageProperties) {}
  public async render(): Promise<HttpResponse> {
    const user = await this.properties.authenticator.authenticate(
      this.properties.authenticationToken
    );

    if (!user.isAuthenticated) {
      console.error("User is not authenticated", user);
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.FORBIDDEN,
        headers: {},
        body: "Forbidden.",
      };
    }

    const notebook = await this.properties.notebookStore.getOne(
      user.username,
      this.properties.notebookID
    );
    if (!notebook) {
      console.error(
        "Notebook is not found for user ",
        user.username,
        this.properties.notebookID
      );
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.NOT_FOUND,
        headers: {},
        body: "Not found.",
      };
    }

    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `
        <h1 data-testid='notebook-name'>${notebook.name}</h1>
        <form method='post' action='${this.properties.baseUrl}/notebook/${notebook.id}/edit'>
          <input type='hidden' name='notebook-id' value='${notebook.id}' />
          <input type='text' name='notebook-name' value='${notebook.name}' data-testid='notebook-name-input' />
          <button type='submit' data-testid='edit-notebook-button'>Update</button>
        </form>
        <a href='${this.properties.baseUrl}/notebook/${notebook.id}'>Cancel edit</a>
      `,
    };
  }
}

export const getEditNotebookHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  return await new NotebookEditPage({
    ...dependenciesConfiguration({}),
    notebookID: request.pathParameters.notebookID,
    authenticationToken: parseCookie(request.headers, "Authentication"),
  }).render();
};
