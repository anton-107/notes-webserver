import { noteControllerConfiguration } from "../../../configuration/configuration";
import { DateRangeController } from "../../../controller/note/date-range/date-range-controller";
import { parseBody } from "../../../http/body-parser";
import { parseCookie } from "../../../http/cookie-parser";
import {
  HttpRequestHandler,
  HttpResponse,
  PostFormRequest,
} from "../../../http/http";
import { NoteHtmlView } from "../../../views/note/note-html-view";

export const postDateRangeHandler: HttpRequestHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  const configuration = noteControllerConfiguration({});
  const requestBody = parseBody(request);
  return await new DateRangeController({
    ...configuration,
    entityView: new NoteHtmlView({ ...configuration }),
    authenticationToken: parseCookie(request.headers, "Authentication"),
    notebookID: null,
  }).performCreateSingleEntityAction(requestBody);
};
