import { Person } from "notes-model/dist/person-model";

export class PersonSelectorHtmlMacro {
  public renderPersonSelectorMacro(
    people: Person[],
    selectedValue: string | null
  ): string {
    return `
      <select name='person-id' data-testid='person-selector'>
        ${people
          .map(
            (person) =>
              `<option ${
                selectedValue === person.id ? "selected" : ""
              } value='${person.id}'>${person.name}</option>`
          )
          .join("")}
      </select>
    `;
  }
}
