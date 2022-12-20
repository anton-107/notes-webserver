import { notebookControllerConfiguration } from "../../configuration/configuration";
import { parseCookie } from "../../http/cookie-parser";
import { HttpHeaders } from "../../http/http";
import {
  parseResponseType,
  ResponseType,
} from "../../http/response-type-parser";
import { NotebookHtmlView } from "../../views/notebook/notebook-html-view";
import { NotebookJsonView } from "../../views/notebook/notebook-json-view";
import { NotebookController } from "./notebook-controller";

interface NotebookControllerBuilderProperties {
  headers: HttpHeaders;
  responseType: ResponseType;
}

export class NotebookControllerBuilder {
  public static build(
    properties: NotebookControllerBuilderProperties
  ): NotebookController {
    const configuration = notebookControllerConfiguration({});
    return new NotebookController({
      ...configuration,
      entityView:
        properties.responseType === ResponseType.JSON
          ? new NotebookJsonView({ ...configuration })
          : new NotebookHtmlView({ ...configuration }),
      authenticationToken: parseCookie(properties.headers, "Authentication"),
      responseType: parseResponseType(properties.headers),
    });
  }
}
