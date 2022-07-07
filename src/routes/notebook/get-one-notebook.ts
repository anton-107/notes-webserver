import { dependenciesConfiguration } from "../../configuration/configuration";
import { EntityControllerProperties } from "../../controller/entity-controller";
import { NotebookController } from "../../controller/notebook/notebook-controller";
import { parseCookie } from "../../http/cookie-parser";
import { HttpRequest, HttpRequestHandler, HttpResponse } from "../../http/http";
import { Notebook } from "../../stores/notebook-store";
import { NotebookHtmlView } from "../../views/notebook/notebook-html-view";

export const getOneNotebookHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  const configuration = dependenciesConfiguration({});
  const properties: EntityControllerProperties<Notebook> = {
    ...configuration,
    authenticationToken: parseCookie(request.headers, "Authentication"),
    entityView: new NotebookHtmlView({ ...configuration }),
    entityStore: configuration.notebookStore,
  };

  return await new NotebookController(properties).showSingleEntityDetailsPage(
    request.pathParameters.notebookID
  );
};
