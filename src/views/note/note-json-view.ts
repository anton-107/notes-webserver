import { EntityView } from "../../controller/entity-controller";
import { HttpResponse, HttpStatus } from "../../http/http";
import { Note } from "../../model/note-model";
import { NoteHtmlView } from "./note-html-view";

export class NoteJsonView extends NoteHtmlView implements EntityView<Note> {
  public renderDetailsPageOneEntity(entity: Note): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: JSON.stringify(entity),
    };
  }
}
