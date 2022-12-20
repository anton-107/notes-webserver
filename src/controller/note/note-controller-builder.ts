import { noteControllerConfiguration } from "../../configuration/configuration";
import { parseCookie } from "../../http/cookie-parser";
import { HttpHeaders } from "../../http/http";
import { ResponseType } from "../../http/response-type-parser";
import { NoteHtmlView } from "../../views/note/note-html-view";
import { NoteJsonView } from "../../views/note/note-json-view";
import { NoteController } from "./note-controller";

interface NoteControllerBuilderProperties {
  headers: HttpHeaders;
  responseType: ResponseType;
}

export class NoteControllerBuilder {
  public static build(
    properties: NoteControllerBuilderProperties
  ): NoteController {
    const configuration = noteControllerConfiguration({});
    return new NoteController({
      ...configuration,
      entityView:
        properties.responseType === ResponseType.JSON
          ? new NoteJsonView({ ...configuration })
          : new NoteHtmlView({ ...configuration }),
      authenticationToken: parseCookie(properties.headers, "Authentication"),
      notebookID: null,
      noteType: null,
      responseType: properties.responseType,
    });
  }
}
