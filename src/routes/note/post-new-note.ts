import { noteControllerConfiguration } from "../../configuration/configuration";
import { NoteController } from "../../controller/note/note-controller";
import { parseBody } from "../../http/body-parser";
import { parseCookie } from "../../http/cookie-parser";
import {
  HttpRequestHandler,
  HttpResponse,
  PostFormRequest,
} from "../../http/http";
import {
  parseResponseType,
  ResponseType,
} from "../../http/response-type-parser";
import { NoteHtmlView } from "../../views/note/note-html-view";
import { NoteJsonView } from "../../views/note/note-json-view";

export const postNewNoteHandler: HttpRequestHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  const configuration = noteControllerConfiguration({});
  const requestBody = parseBody(request);
  const responseType = parseResponseType(request.headers);
  return await new NoteController({
    ...configuration,
    entityView:
      responseType === ResponseType.JSON
        ? new NoteJsonView({ ...configuration })
        : new NoteHtmlView({ ...configuration }),
    authenticationToken: parseCookie(request.headers, "Authentication"),
    notebookID: null,
    noteType: null,
    responseType,
  }).performCreateSingleEntityAction(requestBody);
};
