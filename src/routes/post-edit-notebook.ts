import { Authenticator } from "authentication-module/dist/authenticator";
import { dependenciesConfiguration } from "../configuration/configuration";
import { NotebookStore } from "../stores/notebook-store";
import {
  HttpResponse,
  HttpStatus,
  PostFormRequest,
  PostFormHttpHandler,
} from "../http/http";
import { FormBody, parseBody } from "../http/body-parser";
import { parseCookie } from "../http/cookie-parser";

interface EditNotebookActionProperties {
  authenticationToken: string;
  authenticator: Authenticator;
  notebookStore: NotebookStore;
  baseUrl: string;
}

export class EditNotebookAction {
  constructor(private properties: EditNotebookActionProperties) {}
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

    try {
      await this.properties.notebookStore.editOne({
        id: form["notebook-id"],
        name: form["notebook-name"],
        owner: user.username,
      });
    } catch (err) {
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        headers: {},
        body: "Internal server error.",
      };
    }

    headers["Location"] = `${this.properties.baseUrl}/home`;

    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.SEE_OTHER,
      headers,
      body: "",
    };
  }
}

export const postEditNotebookHandler: PostFormHttpHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  return await new EditNotebookAction({
    authenticationToken: parseCookie(request.headers, "Authentication"),
    ...dependenciesConfiguration({}),
  }).render(parseBody(request));
};
