import { PersonSelectorHtmlMacro } from "../../views/person/person-selector-html-macro";
import { PostProcessor } from "../post-processor";

export class PersonSelectorController implements PostProcessor {
  public getRegularExpressionForMacro(): RegExp {
    return /{{MACRO_PERSON_SELECTOR:?([A-z0-9-]+)?}}/;
  }
  public async renderMacro(match: RegExpMatchArray): Promise<string> {
    const view = new PersonSelectorHtmlMacro();
    const selectedValue = match[1] || "";
    const people = [
      { id: "justin-case", name: "Justin Case", email: "", manager: "" },
      { id: "john-rope", name: "John Rope", email: "", manager: "" },
    ];
    return view.renderPersonSelectorMacro(people, selectedValue);
  }
}
