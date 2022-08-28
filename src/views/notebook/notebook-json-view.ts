import { EntityView } from "../../controller/entity-controller";
import { HttpResponse, HttpStatus } from "../../http/http";
import { Notebook } from "../../model/notebook-model";
import { NotebookHtmlView } from "./notebook-html-view";

export class NotebookJsonView
  extends NotebookHtmlView
  implements EntityView<Notebook>
{
  public renderDetailsPageOneEntity(entity: Notebook): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      body: JSON.stringify(entity),
      headers: {
        ...this.properties.corsHeaders,
      },
    };
  }
}
