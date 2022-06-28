import { Authenticator } from "authentication-module/dist/authenticator";
import { dependenciesConfiguration } from "./../configuration/configuration";
import { NotebookStore } from "./../stores/notebook-store";

import {
  HttpRequest,
  HttpResponse,
  HttpStatus,
  HttpRequestHandler,
} from "../http/http";
import { parseCookie } from "../http/cookie-parser";

interface HomePageProperties {
  authenticationToken: string;
  authenticator: Authenticator;
  notebookStore: NotebookStore;
  baseUrl: string;
}

export class HomePage {
  constructor(private properties: HomePageProperties) {}

  public async render(): Promise<HttpResponse> {
    const headers: { [name: string]: string } = {};
    headers["Content-Type"] = "text/html; charset=utf-8";

    const responseToAnonymous = `<h1>hello anonymous!</h1><a data-testid='sign-in-link' href='${this.properties.baseUrl}/signin'>Sign in</a>`;

    const authToken = this.properties.authenticationToken;
    if (!authToken) {
      console.log("No auth token is present");
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.OK,
        headers,
        body: responseToAnonymous,
      };
    }

    const user = await this.properties.authenticator.authenticate(authToken);
    if (!user.isAuthenticated) {
      console.log("Not authenticated:", user.errorMessage);
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.OK,
        headers,
        body: responseToAnonymous,
      };
    }

    const notebooks = await this.properties.notebookStore.listAll(
      user.username
    );

    const body = `<h1 data-testid='user-greeting'>hello ${user.username}!</h1>
      <form method='post' action='${
        this.properties.baseUrl
      }/signout'><button type='submit' data-testid='sign-out-button'>Sign out</button></form>
      <a href='${
        this.properties.baseUrl
      }/new-notebook' data-testid='create-new-notebook-link'>Create new notebook</a>
      ${notebooks
        .map(
          (x) =>
            `<div><a href='${this.properties.baseUrl}/notebook/${x.id}' data-testid='notebook-name'>${x.name}</a></div>`
        )
        .join("")}
      `;

    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers,
      body,
    };
  }
}

export const getHomeHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  return await new HomePage({
    authenticationToken: parseCookie(request.headers, "Authentication"),
    ...dependenciesConfiguration({}),
  }).render();
};
