import { dependenciesConfiguration } from "../../configuration/configuration";
import { EntityControllerProperties } from "../../controller/entity-controller";
import { NotebookController } from "../../controller/notebook/notebook-controller";
import { parseBody } from "../../http/body-parser";
import { parseCookie } from "../../http/cookie-parser";
import {
  HttpResponse,
  PostFormHttpHandler,
  PostFormRequest,
} from "../../http/http";
import { Notebook } from "../../stores/notebook-store";
import { HttpRedirectView } from "../../views/http-redirect-view";
import { NotebookHtmlView } from "../../views/notebook/notebook-html-view";

export const postEditNotebookHandler: PostFormHttpHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  const configuration = dependenciesConfiguration({});
  const properties: EntityControllerProperties<Notebook> = {
    ...configuration,
    authenticationToken: parseCookie(request.headers, "Authentication"),
    entityView: new NotebookHtmlView({ ...configuration }),
    httpRedirectView: new HttpRedirectView({ ...configuration }),
    entityStore: configuration.notebookStore,
  };

  const requestBody = parseBody(request);

  return await new NotebookController(
    properties
  ).performUpdateSingleEntityAction(requestBody);
};
