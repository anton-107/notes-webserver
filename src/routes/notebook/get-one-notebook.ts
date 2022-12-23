import { NotebookControllerBuilder } from "../../controller/notebook/notebook-controller-builder";
import { HttpRequest, HttpRequestHandler, HttpResponse } from "../../http/http";
import { parseResponseType } from "../../http/response-type-parser";

export const getOneNotebookHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  const controller = NotebookControllerBuilder.build({
    headers: request.headers,
    responseType: parseResponseType(request.headers),
  });
  return await controller.showSingleEntityDetailsPage(
    request.pathParameters.notebookID
  );
};
