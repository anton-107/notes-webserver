import { notebookControllerConfiguration } from "../../configuration/configuration";
import { NotebookController } from "../../controller/notebook/notebook-controller";
import { parseBody } from "../../http/body-parser";
import { parseCookie } from "../../http/cookie-parser";
import {
  HttpResponse,
  PostFormHttpHandler,
  PostFormRequest,
} from "../../http/http";
import {
  parseResponseType,
  ResponseType,
} from "../../http/response-type-parser";
import { NotebookHtmlView } from "../../views/notebook/notebook-html-view";
import { NotebookJsonView } from "../../views/notebook/notebook-json-view";

export const deleteOneNotebookHandler: PostFormHttpHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  const configuration = notebookControllerConfiguration({});
  const requestBody = parseBody(request);
  const responseType = parseResponseType(request.headers);
  return await new NotebookController({
    ...configuration,
    entityView:
      responseType === ResponseType.JSON
        ? new NotebookJsonView({ ...configuration })
        : new NotebookHtmlView({ ...configuration }),
    authenticationToken: parseCookie(request.headers, "Authentication"),
    responseType: parseResponseType(request.headers),
  }).performDeleteSingleEntityAction(requestBody["notebook-id"]);
};
