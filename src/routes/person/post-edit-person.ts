import { PersonControllerBuilder } from "../../controller/person/person-controller-builder";
import { parseBody } from "../../http/body-parser";
import {
  HttpResponse,
  PostFormHttpHandler,
  PostFormRequest,
} from "../../http/http";
import { parseResponseType } from "../../http/response-type-parser";

export const postEditPersonHandler: PostFormHttpHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  const requestBody = parseBody(request);
  const responseType = parseResponseType(request.headers);

  const controller = PersonControllerBuilder.build({
    headers: request.headers,
    responseType,
  });

  return await controller.performUpdateSingleEntityAction(requestBody);
};
