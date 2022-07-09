import { notebookControllerConfiguration } from "../../configuration/configuration";
import { NotebookController } from "../../controller/notebook/notebook-controller";
import { parseCookie } from "../../http/cookie-parser";
import { HttpRequest, HttpRequestHandler, HttpResponse } from "../../http/http";

export const getOneNotebookHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  return await new NotebookController({
    ...notebookControllerConfiguration({}),
    authenticationToken: parseCookie(request.headers, "Authentication"),
  }).showSingleEntityDetailsPage(request.pathParameters.notebookID);
};
