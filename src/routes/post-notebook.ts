import { Authenticator } from "authentication-module/dist/authenticator";
import { dependenciesConfiguration } from "../configuration/configuration";
import { NotebookStore } from "../notebook-store";
import {
  HttpResponse,
  HttpStatus,
  PostFormRequest,
  PostFormHttpHandler,
} from "../http";

interface CreateNotebookActionProperties {
  authenticationToken: string;
  authenticator: Authenticator;
  notebookStore: NotebookStore;
  baseUrl: string;
}

export class CreateNotebookAction {
  constructor(private properties: CreateNotebookActionProperties) {}
  public async render(form: { [key: string]: string }): Promise<HttpResponse> {
    const headers: { [name: string]: string } = {};
    const user = await this.properties.authenticator.authenticate(
      this.properties.authenticationToken
    );

    await this.properties.notebookStore.add({
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
    authenticationToken: request.authenticationToken,
    ...dependenciesConfiguration({}),
  }).render(request.postBody);
};
