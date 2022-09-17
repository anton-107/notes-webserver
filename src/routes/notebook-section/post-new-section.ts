import { notebookSectionControllerConfiguration } from "../../configuration/configuration";
import { NotebookSectionController } from "../../controller/notebook-section/notebook-section-controller";
import { parseBody } from "../../http/body-parser";
import { parseCookie } from "../../http/cookie-parser";
import {
  HttpRequestHandler,
  HttpResponse,
  PostFormRequest,
} from "../../http/http";
import { parseResponseType } from "../../http/response-type-parser";

export const postNewSectionHandler: HttpRequestHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  const configuration = notebookSectionControllerConfiguration({});
  const requestBody = parseBody(request);
  const responseType = parseResponseType(request.headers);
  return await new NotebookSectionController({
    ...configuration,
    authenticationToken: parseCookie(request.headers, "Authentication"),
    notebookID: request.pathParameters.notebookID,
    responseType,
  }).performCreateSingleEntityAction(requestBody);
};
