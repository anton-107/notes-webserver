import { NotebookControllerBuilder } from "../../controller/notebook/notebook-controller-builder";
import { parseBody } from "../../http/body-parser";
import {
  HttpResponse,
  PostFormHttpHandler,
  PostFormRequest,
} from "../../http/http";
import { parseResponseType } from "../../http/response-type-parser";

export const deleteOneNotebookHandler: PostFormHttpHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  const requestBody = parseBody(request);
  const responseType = parseResponseType(request.headers);

  const controller = NotebookControllerBuilder.build({
    headers: request.headers,
    responseType,
  });

  return await controller.performDeleteSingleEntityAction(
    requestBody["notebook-id"]
  );
};
