import { dependenciesConfiguration } from "../../configuration/configuration";
import { HttpResponse, HttpRequestHandler, HttpRequest } from "../../http/http";
import { NotebookController } from "../../controller/notebook/notebook-controller";
import { EntityControllerProperties } from "../../controller/entity-controller";
import { Notebook } from "../../stores/notebook-store";
import { parseCookie } from "../../http/cookie-parser";
import { NotebookHtmlView } from "../../views/notebook/notebook-html-view";
import { HttpRedirectView } from "../../views/http-redirect-view";

export const getNewNotebookHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  const configuration = dependenciesConfiguration({});
  const properties: EntityControllerProperties<Notebook> = {
    ...configuration,
    authenticationToken: parseCookie(request.headers, "Authentication"),
    entityView: new NotebookHtmlView({ ...configuration }),
    httpRedirectView: new HttpRedirectView({ ...configuration }),
    entityStore: configuration.notebookStore,
  };

  return await new NotebookController(properties).showCreateNewEntityPage();
};
