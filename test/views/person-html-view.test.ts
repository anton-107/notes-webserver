import { PersonHtmlView } from "../../src/views/person/person-html-view";

describe("Person HTML view", () => {
  it("should renderListPageAllEntities", () => {
    const v = new PersonHtmlView({
      baseUrl: "",
      corsHeaders: {
        "Access-Control-Allow-Credentials": "false",
        "Access-Control-Allow-Origin": "*"
      }
    });
    const resp = v.renderListPageAllEntities([]);
    const json = JSON.parse(resp.body);
    expect(Array.isArray(json.people)).toBe(true);
  });
});
