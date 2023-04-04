import { Person } from "notes-model/dist/person-model";

import { PersonStore } from "../../stores/person/person-store";
import { PostProcessor } from "../post-processor";

export interface PersonShortRepresentationControllerProperties {
  personStore: PersonStore;
}

export class PersonShortRepresentationController implements PostProcessor {
  constructor(
    private properties: PersonShortRepresentationControllerProperties
  ) {}

  private personListCache: { [username: string]: Person[] } = {};

  public getRegularExpressionForMacro(): RegExp {
    return /{{MACRO_PERSON_SHORT_REPRESENTATION:?([A-z0-9]+)?}}/;
  }
  public async renderMacro(
    username: string,
    match: RegExpMatchArray
  ): Promise<string> {
    const selectedPersonID = match[1] || "";
    const people = await this.getListOfPeople(username);
    const person = people.find((x) => x.id === selectedPersonID);

    return `<div data-testid='person-name'>${
      person ? person.name : `[unknown person ${selectedPersonID}]`
    }</div>`;
  }
  private async getListOfPeople(username: string): Promise<Person[]> {
    if (this.personListCache[username]) {
      return this.personListCache[username];
    }
    const people = await this.properties.personStore.listAll(username);
    this.personListCache[username] = people;
    return people;
  }
}
