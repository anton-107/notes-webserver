import { notebookControllerConfiguration } from "../../configuration/configuration";
import { NotebookController } from "../../controller/notebook/notebook-controller";
import { parseCookie } from "../../http/cookie-parser";
import { HttpRequest, HttpRequestHandler, HttpResponse } from "../../http/http";
import { parseResponseType } from "../../http/response-type-parser";

export const getAllNotebooksHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  return await new NotebookController({
    ...notebookControllerConfiguration({}),
    authenticationToken: parseCookie(request.headers, "Authentication"),
    responseType: parseResponseType(request.headers),
  }).showListEntitiesPage();
};
