import { PersonStore } from "../../stores/person/person-store";
import { PersonSelectorHtmlMacro } from "../../views/person/person-selector-html-macro";
import { PostProcessor } from "../post-processor";

export interface PersonSelectorControllerProperties {
  personStore: PersonStore;
}

export class PersonSelectorController implements PostProcessor {
  constructor(private properties: PersonSelectorControllerProperties) {}

  public getRegularExpressionForMacro(): RegExp {
    return /{{MACRO_PERSON_SELECTOR:?([A-z0-9-]+)?}}/;
  }
  public async renderMacro(
    username: string,
    match: RegExpMatchArray
  ): Promise<string> {
    const view = new PersonSelectorHtmlMacro();
    const selectedValue = match[1] || "";
    const people = await this.properties.personStore.listAll(username);
    return view.renderPersonSelectorMacro(people, selectedValue);
  }
}
