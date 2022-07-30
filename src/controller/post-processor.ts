import { HttpResponse } from "../http/http";
import { PersonSelectorHtmlMacro } from "../views/person/person-selector-html-macro";

export class PostProcessor {
  public async processResponse(response: HttpResponse): Promise<HttpResponse> {
    response.body = await this.showPersonSelector(response.body);
    return response;
  }
  private async showPersonSelector(body: string): Promise<string> {
    const regexp = /{{MACRO_PERSON_SELECTOR:?([A-z0-9-]+)?}}/;
    const match = body.match(regexp);
    if (match) {
      const view = new PersonSelectorHtmlMacro();
      const selectedValue = match[1] || "";
      const people = [
        { id: "justin-case", name: "Justin Case", email: "", manager: "" },
        { id: "john-rope", name: "John Rope", email: "", manager: "" },
      ];
      return body.replace(
        regexp,
        view.renderPersonSelectorMacro(people, selectedValue)
      );
    }
    return body;
  }
}
