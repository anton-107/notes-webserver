import { EntityView } from "../../controller/entity-controller";
import { HttpResponse, HttpStatus } from "../../http/http";
import { Person } from "../../model/person-model";
import { HtmlViewProperties } from "../interfaces";

export class PersonHtmlView implements EntityView<Person> {
  constructor(private properties: HtmlViewProperties) {}
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
          <input type='text' name='person-name' value='${person.name}' data-testid='person-name-input' />
          <input type='text' name='person-email' value='${person.email}' data-testid='person-email-input' />
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
        <input name='person-name' data-testid='person-name-input' />
        <input name='person-email' data-testid='person-email-input' />
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
          <input type='hidden' name='personID' value='${person.id}' />
          <button type='submit' data-testid='delete-person-button'>Delete this person entry</button>
        </form>
      `,
    };
  }
}
