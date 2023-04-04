import { Person } from "notes-model/dist/person-model";

import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse, HttpStatus } from "../../http/http";
import { EntityView } from "../entity-view";
import { HtmlViewProperties } from "../interfaces";
import { PersonHtmlView } from "./person-html-view";

export interface PersonJsonViewProperties extends HtmlViewProperties {
  corsHeaders: CORSHeaders;
}

export class PersonJsonView
  extends PersonHtmlView
  implements EntityView<Person>
{
  constructor(protected properties: PersonJsonViewProperties) {
    super(properties);
  }
  public renderDetailsPageOneEntity(entity: Person): HttpResponse {
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
