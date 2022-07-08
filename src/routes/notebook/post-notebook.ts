import { Authenticator } from "authentication-module/dist/authenticator";
import { dependenciesConfiguration } from "../../configuration/configuration";
import { NotebookStore } from "../../stores/notebook-store";
import {
  HttpResponse,
  HttpStatus,
  PostFormRequest,
  PostFormHttpHandler,
} from "../../http/http";
import { FormBody, parseBody } from "../../http/body-parser";
import { parseCookie } from "../../http/cookie-parser";
import { generate } from "short-uuid";

interface CreateNotebookActionProperties {
  authenticationToken: string;
  authenticator: Authenticator;
  notebookStore: NotebookStore;
  baseUrl: string;
}

export class CreateNotebookAction {
  constructor(private properties: CreateNotebookActionProperties) {}
  public async render(form: FormBody): Promise<HttpResponse> {
    const headers: { [name: string]: string } = {};
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

    await this.properties.notebookStore.add({
      id: generate(),
      name: form["notebook-name"],
      owner: user.username,
    });

    headers["Location"] = `${this.properties.baseUrl}/home`;

    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.SEE_OTHER,
      headers,
      body: "",
    };
  }
}

export const postNotebookHandler: PostFormHttpHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  return await new CreateNotebookAction({
    authenticationToken: parseCookie(request.headers, "Authentication"),
    ...dependenciesConfiguration({}),
  }).render(parseBody(request));
};