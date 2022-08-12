import { dependenciesConfiguration } from "../../configuration/configuration";
import { SigninController } from "../../controller/auth/signin-controller";
import { parseBody } from "../../http/body-parser";
import { parseCookie } from "../../http/cookie-parser";
import {
  HttpResponse,
  PostFormHttpHandler,
  PostFormRequest,
} from "../../http/http";
import { parseResponseType } from "../../http/response-type-parser";

export const postSigninHandler: PostFormHttpHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  const responseType = parseResponseType(request.headers);
  return await new SigninController({
    authenticationToken: parseCookie(request.headers, "Authentication"),
    responseType,
    ...dependenciesConfiguration({}),
  }).render(parseBody(request));
};
