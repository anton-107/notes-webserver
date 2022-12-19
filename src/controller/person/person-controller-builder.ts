import { personControllerConfiguration } from "../../configuration/configuration";
import { PersonController } from "../../controller/person/person-controller";
import { parseCookie } from "../../http/cookie-parser";
import { HttpHeaders } from "../../http/http";
import {
  parseResponseType,
  ResponseType,
} from "../../http/response-type-parser";
import { PersonHtmlView } from "../../views/person/person-html-view";
import { PersonJsonView } from "../../views/person/person-json-view";

interface PersonControllerBuilderProperties {
  headers: HttpHeaders;
  responseType: ResponseType;
}

export class PersonControllerBuilder {
  public static build(
    properties: PersonControllerBuilderProperties
  ): PersonController {
    const configuration = personControllerConfiguration({});
    return new PersonController({
      ...configuration,
      authenticationToken: parseCookie(properties.headers, "Authentication"),
      responseType: parseResponseType(properties.headers),
      entityView:
        properties.responseType === ResponseType.JSON
          ? new PersonJsonView({ ...configuration })
          : new PersonHtmlView({ ...configuration }),
    });
  }
}
