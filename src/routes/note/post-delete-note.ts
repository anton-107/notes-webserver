import { noteControllerConfiguration } from "../../configuration/configuration";
import { NoteController } from "../../controller/note/note-controller";
import { parseBody } from "../../http/body-parser";
import { parseCookie } from "../../http/cookie-parser";
import {
  HttpRequestHandler,
  HttpResponse,
  PostFormRequest,
} from "../../http/http";
import { parseResponseType } from "../../http/response-type-parser";
import { NoteHtmlView } from "../../views/note/note-html-view";

export const postDeleteNoteHandler: HttpRequestHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  const configuration = noteControllerConfiguration({});
  const requestBody = parseBody(request);
  return await new NoteController({
    ...configuration,
    entityView: new NoteHtmlView({ ...configuration }),
    authenticationToken: parseCookie(request.headers, "Authentication"),
    notebookID: null,
    noteType: null,
    responseType: parseResponseType(request.headers),
  }).performDeleteSingleEntityAction(requestBody["note-id"]);
};
