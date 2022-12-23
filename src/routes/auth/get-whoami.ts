import { dependenciesConfiguration } from "../../configuration/configuration";
import { IdentityPageController } from "../../controller/auth/identity-page-controller";
import { parseCookie } from "../../http/cookie-parser";
import { HttpRequest, HttpRequestHandler, HttpResponse } from "../../http/http";

export const getWhoamiHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  return await new IdentityPageController({
    authenticationToken: parseCookie(request.headers, "Authentication"),
    ...dependenciesConfiguration({}),
  }).render();
};
