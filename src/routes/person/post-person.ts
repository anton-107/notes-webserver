import { personControllerConfiguration } from "../../configuration/configuration";
import { PersonController } from "../../controller/person/person-controller";
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
import { PersonHtmlView } from "../../views/person/person-html-view";
import { PersonJsonView } from "../../views/person/person-json-view";

export const postPersonHandler: PostFormHttpHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  const configuration = personControllerConfiguration({});
  const requestBody = parseBody(request);
  const responseType = parseResponseType(request.headers);
  return await new PersonController({
    ...configuration,
    authenticationToken: parseCookie(request.headers, "Authentication"),
    responseType: parseResponseType(request.headers),
    entityView:
      responseType === ResponseType.JSON
        ? new PersonJsonView({ ...configuration })
        : new PersonHtmlView({ ...configuration }),
  }).performCreateSingleEntityAction(requestBody);
};
