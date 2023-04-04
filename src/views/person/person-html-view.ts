import { Person } from "notes-model/dist/person-model";

import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse, HttpStatus } from "../../http/http";
import { EntityView } from "../entity-view";
import { HtmlViewProperties } from "../interfaces";

export interface PersonHtmlViewProperties extends HtmlViewProperties {
  corsHeaders: CORSHeaders;
}

export class PersonHtmlView implements EntityView<Person> {
  constructor(protected properties: PersonHtmlViewProperties) {}
  public renderEditingFormOneEntity(person: Person): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `
        <h1 data-testid='person-name'>${person.name}</h1>
        <form method='post' action='${this.properties.baseUrl}/person/${person.id}/edit'>
          <input type='hidden' name='person-id' value='${person.id}' />
          <label>Person name:
            <input type='text' name='person-name' value='${person.name}' data-testid='person-name-input' />
          </label>
          <label>Person email:
            <input type='text' name='person-email' value='${person.email}' data-testid='person-email-input' />
          </label>
          <button type='submit' data-testid='edit-person-button'>Update</button>
        </form>
        <a href='${this.properties.baseUrl}/person/${person.id}'>Cancel edit</a>
      `,
    };
  }
  public renderCreationFormOneEntity(): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `<form method='post' action='${this.properties.baseUrl}/person'>
        <label>Person name:
          <input name='person-name' data-testid='person-name-input' />
        </label>
        <label>Person email:
          <input name='person-email' data-testid='person-email-input' />
        </label>
        <input type='submit' />
      </form>`,
    };
  }
  public renderDetailsPageOneEntity(person: Person): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `
        <h1 data-testid='person-name'>${person.name}</h1>
        <a href='${this.properties.baseUrl}/person/${person.id}/edit' data-testid='edit-person-link'>Edit this person details</a>
        <form method='post' action='${this.properties.baseUrl}/delete-person'>
          <input type='hidden' name='person-id' value='${person.id}' />
          <button type='submit' data-testid='delete-person-button'>Delete this person entry</button>
        </form>
      `,
    };
  }
  public renderListPageAllEntities(entities: Person[]): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...this.properties.corsHeaders,
      },
      body: JSON.stringify({
        people: entities,
      }),
    };
  }
}
