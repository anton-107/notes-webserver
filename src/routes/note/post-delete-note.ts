import { NoteControllerBuilder } from "../../controller/note/note-controller-builder";
import { parseBody } from "../../http/body-parser";
import {
  HttpRequestHandler,
  HttpResponse,
  PostFormRequest,
} from "../../http/http";
import { parseResponseType } from "../../http/response-type-parser";

export const postDeleteNoteHandler: HttpRequestHandler = async (
  request: PostFormRequest
): Promise<HttpResponse> => {
  const requestBody = parseBody(request);
  const responseType = parseResponseType(request.headers);

  const controller = NoteControllerBuilder.build({
    headers: request.headers,
    responseType,
  });

  return await controller.performDeleteSingleEntityAction(
    requestBody["note-id"]
  );
};
