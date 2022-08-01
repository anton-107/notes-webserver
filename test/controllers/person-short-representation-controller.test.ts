import { PersonShortRepresentationController } from "../../src/controller/person/person-short-representation-controller";
import { InMemoryPersonStore } from "../../src/stores/person/person-store";

describe("PersonShortRepresentationController", () => {
  it("should show a person as an unknown person if it the person id is empty", async () => {
    const match = "{{MACRO_PERSON_SHORT_REPRESENTATION}}".match(
      /{{MACRO_PERSON_SHORT_REPRESENTATION:?([A-z0-9]+)?}}/
    );
    const c = new PersonShortRepresentationController({
      personStore: new InMemoryPersonStore(),
    });
    const output = await c.renderMacro("fake-user", match);
    expect(output).toContain("[unknown person ]");
  });
  it("should show a person as an unknown person if it the person id is empty", async () => {
    const match = "{{MACRO_PERSON_SHORT_REPRESENTATION:somepersonid}}".match(
      /{{MACRO_PERSON_SHORT_REPRESENTATION:?([A-z0-9]+)?}}/
    );
    const c = new PersonShortRepresentationController({
      personStore: new InMemoryPersonStore(),
    });
    const output = await c.renderMacro("fake-user", match);
    expect(output).toContain("[unknown person somepersonid]");
  });
});
