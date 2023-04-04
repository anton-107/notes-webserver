import { Notebook } from "notes-model/dist/notebook-model";
import { Person } from "notes-model/dist/person-model";

import { HtmlViewProperties } from "../interfaces";

export class HomeHtmlView {
  constructor(private properties: HtmlViewProperties) {}
  public renderHomePage(
    username: string,
    notebooks: Notebook[],
    people: Person[]
  ): string {
    return `<h1 data-testid='user-greeting'>hello ${username}!</h1>
      <form method='post' action='${
        this.properties.baseUrl
      }/signout'><button type='submit' data-testid='sign-out-button'>Sign out</button></form>
      <a href='${
        this.properties.baseUrl
      }/new-notebook' data-testid='create-new-notebook-link'>Create new notebook</a>
      ${notebooks
        .map(
          (x) =>
            `<div><a href='${this.properties.baseUrl}/notebook/${x.id}' data-testid='notebook-name'>${x.name}</a></div>`
        )
        .join("")}

      <a href='${
        this.properties.baseUrl
      }/new-person' data-testid='create-new-person-link'>Add new person</a>
      ${people
        .map(
          (x) =>
            `<div><a href='${this.properties.baseUrl}/person/${x.id}' data-testid='person-name'>${x.name}</a></div>`
        )
        .join("")}
      `;
  }
}
