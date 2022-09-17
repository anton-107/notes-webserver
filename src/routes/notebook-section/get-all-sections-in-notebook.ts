import { notebookSectionControllerConfiguration } from "../../configuration/configuration";
import { NotebookSectionController } from "../../controller/notebook-section/notebook-section-controller";
import { parseCookie } from "../../http/cookie-parser";
import {
  HttpRequestHandler,
  HttpResponse,
  PostFormRequest,
} from "../../http/http";
import { parseResponseType } from "../../http/response-type-parser";

export const getAllSectionInNotebookHandler: HttpRequestHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  const configuration = notebookSectionControllerConfiguration({});
  const responseType = parseResponseType(request.headers);
  return await new NotebookSectionController({
    ...configuration,
    authenticationToken: parseCookie(request.headers, "Authentication"),
    notebookID: request.pathParameters.notebookID,
    responseType,
  }).showSectionsInNotebook(request.pathParameters.notebookID);
};
