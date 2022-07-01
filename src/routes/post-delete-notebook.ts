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

interface DeleteNotebookActionProperties {
  authenticationToken: string;
  authenticator: Authenticator;
  notebookStore: NotebookStore;
  baseUrl: string;
}

export class DeleteNotebookAction {
  constructor(private properties: DeleteNotebookActionProperties) {}
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
    if (!form["notebookID"]) {
      console.error("No notebook id found in request", form);
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.BAD_REQUEST,
        headers: {},
        body: "Bad request.",
      };
    }

    try {
      await this.properties.notebookStore.deleteOne(
        user.username,
        form["notebookID"]
      );
    } catch (err) {
      console.log("Could not delete notebook", form, err);
      return {
        isBase64Encoded: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        headers: {},
        body: "Internal server error.",
      };
    }

    headers["Location"] = `${this.properties.baseUrl}/home`;

    console.log("notebook deleted", user.username, form);
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.SEE_OTHER,
      headers,
      body: "",
    };
  }
}

export const deleteOneNotebookHandler: PostFormHttpHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  return await new DeleteNotebookAction({
    authenticationToken: parseCookie(request.headers, "Authentication"),
    ...dependenciesConfiguration({}),
  }).render(parseBody(request));
};
