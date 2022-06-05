import { Authenticator } from "authentication-module/dist/authenticator";
import { dependenciesConfiguration } from "./../configuration/configuration";
import { NotebookStore } from "./../notebook-store";
import {
  HttpRequest,
  HttpResponse,
  HttpResponseHeader,
  HttpStatus,
  RouteHandler,
} from "../router";

interface HomePageProperties {
  authenticationToken: string;
  authenticator: Authenticator;
  notebookStore: NotebookStore;
}

class HomePage {
  constructor(private properties: HomePageProperties) {}

  public async render(): Promise<HttpResponse> {
    const headers: HttpResponseHeader[] = [];
    headers.push({
      headerName: "Content-Type",
      headerValue: "text/html; charset=utf-8",
    });

    const responseToAnonymous =
      "<h1>hello anonymous!</h1><a data-testid='sign-in-link' href='/signin'>Sign in</a>";

    const authToken = this.properties.authenticationToken;
    if (!authToken) {
      return {
        status: HttpStatus.OK,
        headers,
        body: responseToAnonymous,
      };
    }

    const user = await this.properties.authenticator.authenticate(authToken);
    if (!user.isAuthenticated) {
      return {
        status: HttpStatus.OK,
        headers,
        body: responseToAnonymous,
      };
    }

    const notebooks = await this.properties.notebookStore.listAll(
      user.username
    );

    const body = `<h1 data-testid='user-greeting'>hello ${user.username}!</h1>
      <form method='post' action='/signout'><button type='submit' data-testid='sign-out-button'>Sign out</button></form>
      <a href='/new-notebook' data-testid='create-new-notebook-link'>Create new notebook</a>
      ${notebooks
        .map(
          (x) => `<div><span data-testid='notebook-name'>${x.name}</span></div>`
        )
        .join("")}
      `;

    return {
      status: HttpStatus.OK,
      headers,
      body,
    };
  }
}

export const getHomeHandler: RouteHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  return await new HomePage({
    authenticationToken: request.authenticationToken,
    ...dependenciesConfiguration(),
  }).render();
};
