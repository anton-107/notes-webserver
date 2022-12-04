import { parseBody } from "./../../src/http/body-parser";

describe("body-parser:parseBody", () => {
  it("should parse an http form", () => {
    const form = parseBody({
      body: "field1=value1&field2=value2",
      headers: {},
      pathParameters: {},
      queryStringParameters: {},
    });
    expect(form.field1).toBe("value1");
    expect(form.field2).toBe("value2");
  });
  it("should parse a json form", () => {
    const form = parseBody({
      body: '{"field1": "value1", "field2": "value2"}',
      headers: {
        "content-type": "application/json",
      },
      pathParameters: {},
      queryStringParameters: {},
    });
    expect(form.field1).toBe("value1");
    expect(form.field2).toBe("value2");
  });
});
