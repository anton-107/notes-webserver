import { NoteControllerBuilder } from "../../controller/note/note-controller-builder";
import { HttpRequest, HttpRequestHandler, HttpResponse } from "../../http/http";
import { parseResponseType } from "../../http/response-type-parser";

export const getNewNoteHandler: HttpRequestHandler = async (
  request: HttpRequest
): Promise<HttpResponse> => {
  const controller = NoteControllerBuilder.build({
    headers: request.headers,
    responseType: parseResponseType(request.headers),
    notebookID: request.pathParameters.notebookID,
    noteType: request.pathParameters.noteType,
  });
  return await controller.showCreateNewEntityPage();
};
