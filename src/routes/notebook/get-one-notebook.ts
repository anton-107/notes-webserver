import { notebookControllerConfiguration } from "../../configuration/configuration";
import { NotebookController } from "../../controller/notebook/notebook-controller";
import { parseCookie } from "../../http/cookie-parser";
import { HttpRequest, HttpRequestHandler, HttpResponse } from "../../http/http";
import {
  parseResponseType,
  ResponseType,
} from "../../http/response-type-parser";
import { NotebookJsonView } from "../../views/notebook/notebook-json-view";

export const getOneNotebookHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  const responseType = parseResponseType(request.headers);
  const configuration = {
    ...notebookControllerConfiguration({}),
    authenticationToken: parseCookie(request.headers, "Authentication"),
  };
  if (responseType === ResponseType.JSON) {
    configuration.entityView = new NotebookJsonView(configuration);
  }
  return await new NotebookController(
    configuration
  ).showSingleEntityDetailsPage(request.pathParameters.notebookID);
};
