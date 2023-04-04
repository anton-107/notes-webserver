import { Note } from "notes-model/dist/note-model";

import { HttpResponse, HttpStatus } from "../../http/http";
import { EntityView } from "../entity-view";
import { NoteHtmlView } from "./note-html-view";

export class NoteJsonView extends NoteHtmlView implements EntityView<Note> {
  public renderDetailsPageOneEntity(entity: Note): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        ...this.properties.corsHeaders,
      },
      body: JSON.stringify(entity),
    };
  }
}
