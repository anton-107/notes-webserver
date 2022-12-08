import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse, HttpStatus } from "../../http/http";
import { Notebook } from "../../model/notebook-model";
import { EntityView } from "../entity-view";
import { HtmlViewProperties } from "../interfaces";

export interface NotebookViewProperties extends HtmlViewProperties {
  corsHeaders: CORSHeaders;
}

export class NotebookHtmlView implements EntityView<Notebook> {
  constructor(protected properties: NotebookViewProperties) {}
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
  public renderDetailsPageOneEntity(notebook: Notebook): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `
        <h1 data-testid='notebook-name'>${notebook.name}</h1>
        <a href='${this.properties.baseUrl}/notebook/${notebook.id}/edit' data-testid='edit-notebook-link'>Edit this notebook</a>
        <form method='post' action='${this.properties.baseUrl}/delete-notebook'>
          <input type='hidden' name='notebook-id' value='${notebook.id}' />
          <button type='submit' data-testid='delete-notebook-button'>Delete this notebook</button>
        </form>
        <div>
        {{MACRO_LIST_NOTES}}
        </div>
        <div>
        {{MACRO_LIST_LINKS_TO_ADD_NOTES}}
        </div>
      `,
    };
  }
  public renderListPageAllEntities(entities: Notebook[]): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...this.properties.corsHeaders, // TODO: move this to a json view
      },
      body: JSON.stringify({
        notebooks: entities.map((e) => {
          return {
            ...e,
            detailsURL: `${this.properties.baseUrl}/notebook/${e.id}`,
          };
        }),
      }),
    };
  }
}
