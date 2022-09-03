import { noteControllerConfiguration } from "../../configuration/configuration";
import { NoteController } from "../../controller/note/note-controller";
import { parseCookie } from "../../http/cookie-parser";
import { HttpRequest, HttpRequestHandler, HttpResponse } from "../../http/http";
import { parseResponseType } from "../../http/response-type-parser";
import { NoteHtmlView } from "../../views/note/note-html-view";

export const getEditNoteHandler: HttpRequestHandler = async (
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
    noteType: null,
    authenticationToken: parseCookie(request.headers, "Authentication"),
    responseType: parseResponseType(request.headers),
  }).showEditSingleEntityPage(request.pathParameters.noteID);
};
