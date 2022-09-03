import { personControllerConfiguration } from "../../configuration/configuration";
import { PersonController } from "../../controller/person/person-controller";
import { parseBody } from "../../http/body-parser";
import { parseCookie } from "../../http/cookie-parser";
import {
  HttpResponse,
  PostFormHttpHandler,
  PostFormRequest,
} from "../../http/http";
import { parseResponseType } from "../../http/response-type-parser";

export const deleteOnePersonHandler: PostFormHttpHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  const requestBody = parseBody(request);
  return await new PersonController({
    ...personControllerConfiguration({}),
    authenticationToken: parseCookie(request.headers, "Authentication"),
    responseType: parseResponseType(request.headers),
  }).performDeleteSingleEntityAction(requestBody["personID"]);
};
