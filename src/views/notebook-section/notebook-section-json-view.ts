import { EntityView } from "../../controller/entity-controller";
import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse, HttpStatus } from "../../http/http";
import { NotebookSection } from "../../model/notebook-model";

export interface NotebookSectionJsonViewProperties {
  corsHeaders: CORSHeaders;
}
export class NotebookSectionJsonView implements EntityView<NotebookSection> {
  constructor(protected properties: NotebookSectionJsonViewProperties) {}
  renderEditingFormOneEntity(entity: NotebookSection): HttpResponse {
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
  renderCreationFormOneEntity(
    partialEntity: Partial<NotebookSection>
  ): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        ...this.properties.corsHeaders,
      },
      body: JSON.stringify(partialEntity),
    };
  }
  renderDetailsPageOneEntity(entity: NotebookSection): HttpResponse {
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
  renderListPageAllEntities(entities: NotebookSection[]): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        ...this.properties.corsHeaders,
      },
      body: JSON.stringify({ sections: entities }),
    };
  }
}
