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

interface NotebookDetailsPageProperties {
  authenticationToken: string;
  authenticator: Authenticator;
  notebookStore: NotebookStore;
  notebookID: string;
  baseUrl: string;
}

export class NotebookDetailsPage {
  constructor(private properties: NotebookDetailsPageProperties) {}
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
      body: `<h1  data-testid='notebook-name'>${notebook.name}</h1>`,
    };
  }
}

export const getOneNotebookHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  return await new NotebookDetailsPage({
    ...dependenciesConfiguration({}),
    notebookID: request.pathParameters.notebookID,
    authenticationToken: parseCookie(request.headers, "Authentication"),
  }).render();
};
