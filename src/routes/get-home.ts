import { HomePageController } from "../controller/home/home-page-controller";
import { parseCookie } from "../http/cookie-parser";
import { HttpRequest, HttpRequestHandler, HttpResponse } from "../http/http";
import { dependenciesConfiguration } from "./../configuration/configuration";

export const getHomeHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  return await new HomePageController({
    authenticationToken: parseCookie(request.headers, "Authentication"),
    ...dependenciesConfiguration({}),
  }).render();
};
