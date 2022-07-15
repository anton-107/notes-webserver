import { noteControllerConfiguration } from "../../configuration/configuration";
import { NoteController } from "../../controller/note/note-controller";
import { parseCookie } from "../../http/cookie-parser";
import { HttpRequest, HttpRequestHandler, HttpResponse } from "../../http/http";
import { NoteHtmlView } from "../../views/note/note-html-view";

export const getNewNoteHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  const configuration = noteControllerConfiguration({});
  return await new NoteController({
    ...configuration,
    entityView: new NoteHtmlView({
      ...configuration,
      notebookID: request.pathParameters.notebookID,
    }),
    notebookID: request.pathParameters.notebookID,
    authenticationToken: parseCookie(request.headers, "Authentication"),
  }).showCreateNewEntityPage();
};
