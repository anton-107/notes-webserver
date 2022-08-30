import { noteControllerConfiguration } from "../../configuration/configuration";
import { NoteController } from "../../controller/note/note-controller";
import { parseCookie } from "../../http/cookie-parser";
import { HttpRequest, HttpRequestHandler, HttpResponse } from "../../http/http";
import { NoteJsonView } from "../../views/note/note-json-view";

export const getAllNotesInNotebookHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  const configuration = noteControllerConfiguration({});
  return await new NoteController({
    ...configuration,
    notebookID: request.pathParameters.notebookID,
    noteType: null,
    authenticationToken: parseCookie(request.headers, "Authentication"),
    entityView: new NoteJsonView({ ...configuration }),
  }).showNotesInNotebook(request.pathParameters.notebookID);
};
