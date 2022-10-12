import { personControllerConfiguration } from "../../configuration/configuration";
import { PersonController } from "../../controller/person/person-controller";
import { parseCookie } from "../../http/cookie-parser";
import { HttpRequest, HttpRequestHandler, HttpResponse } from "../../http/http";
import { parseResponseType } from "../../http/response-type-parser";

export const getAllPeopleHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  return await new PersonController({
    ...personControllerConfiguration({}),
    authenticationToken: parseCookie(request.headers, "Authentication"),
    responseType: parseResponseType(request.headers),
  }).showListEntitiesPage();
};
