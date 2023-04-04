import { Notebook, NotebookTableColumn } from "notes-model/dist/notebook-model";

import { HttpResponse, HttpStatus } from "../../http/http";
import { EntityView } from "../entity-view";
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
  public renderSupportedTableColumns(
    columns: NotebookTableColumn[]
  ): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      body: JSON.stringify({ columns }),
      headers: {
        ...this.properties.corsHeaders,
      },
    };
  }
}
