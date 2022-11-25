import { Authenticator } from "authentication-module/dist/authenticator";

import { HttpResponse, HttpStatus } from "../../http/http";
import { Logger } from "../../logger/logger";
import { NotebookStore } from "../../stores/notebook/notebook-store";
import { PersonStore } from "../../stores/person/person-store";
import { HomeHtmlView } from "../../views/home/home-html-view";

interface HomePageProperties {
  logger: Logger;
  authenticationToken: string;
  authenticator: Authenticator;
  notebookStore: NotebookStore;
  personStore: PersonStore;
  baseUrl: string;
}

export class HomePageController {
  constructor(private properties: HomePageProperties) {}

  public async render(): Promise<HttpResponse> {
    const headers: { [name: string]: string } = {};
    headers["Content-Type"] = "text/html; charset=utf-8";

    const responseToAnonymous = `<h1>hello anonymous!</h1><a data-testid='sign-in-link' href='${this.properties.baseUrl}/signin'>Sign in</a>`;

    const authToken = this.properties.authenticationToken;
    if (!authToken) {
      this.properties.logger.info("No auth token is present");
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.OK,
        headers,
        body: responseToAnonymous,
      };
    }

    const user = await this.properties.authenticator.authenticate(authToken);
    if (!user.isAuthenticated) {
      this.properties.logger.info("Not authenticated:", {
        error: Error(user.errorMessage),
      });
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
    const people = await this.properties.personStore.listAll(user.username);

    const homeView = new HomeHtmlView({ baseUrl: this.properties.baseUrl });
    const body = homeView.renderHomePage(user.username, notebooks, people);

    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers,
      body,
    };
  }
}
