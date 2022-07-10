import { personControllerConfiguration } from "../../configuration/configuration";
import { PersonController } from "../../controller/person/person-controller";
import { parseCookie } from "../../http/cookie-parser";
import { HttpRequest, HttpRequestHandler, HttpResponse } from "../../http/http";

export const getNewPersonHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  return await new PersonController({
    ...personControllerConfiguration({}),
    authenticationToken: parseCookie(request.headers, "Authentication"),
  }).showCreateNewEntityPage();
};
