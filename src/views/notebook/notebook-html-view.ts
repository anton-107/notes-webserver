import { EntityView } from "../../controller/entity-controller";
import { HttpResponse, HttpStatus } from "../../http/http";
import { Notebook } from "../../stores/notebook-store";

export interface HtmlViewProperties {
  baseUrl: string;
}

export class NotebookHtmlView implements EntityView<Notebook> {
  constructor(private properties: HtmlViewProperties) {}
  public renderEditingFormOneEntity(notebook: Notebook): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `
        <h1 data-testid='notebook-name'>${notebook.name}</h1>
        <form method='post' action='${this.properties.baseUrl}/notebook/${notebook.id}/edit'>
          <input type='hidden' name='notebook-id' value='${notebook.id}' />
          <input type='text' name='notebook-name' value='${notebook.name}' data-testid='notebook-name-input' />
          <button type='submit' data-testid='edit-notebook-button'>Update</button>
        </form>
        <a href='${this.properties.baseUrl}/notebook/${notebook.id}'>Cancel edit</a>
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
      body: `<form method='post' action='${this.properties.baseUrl}/notebook'>
        <input name='notebook-name' data-testid='notebook-name-input' />
        <input type='submit' />
      </form>`,
    };
  }
}
