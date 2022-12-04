import { dependenciesConfiguration } from "../../configuration/configuration";
import { SearchController } from "../../controller/search/search-controller";
import { parseCookie } from "../../http/cookie-parser";
import { HttpRequest, HttpResponse } from "../../http/http";

export const searchAllHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  const configuration = dependenciesConfiguration({});
  return await new SearchController({
    ...configuration,
    authenticationToken: parseCookie(request.headers, "Authentication"),
  }).search(request.queryStringParameters.query);
};
