import {
  parseResponseType,
  ResponseType,
} from "../../src/http/response-type-parser";

describe("parseResponseType", () => {
  it("should return json in the content type is set to application/json", async () => {
    const responseType = parseResponseType({
      "content-type": "application/json",
    });
    expect(responseType).toBe(ResponseType.JSON);
  });
  it("should return html to other content types", async () => {
    const responseType = parseResponseType({
      "content-type": "application/form",
    });
    expect(responseType).toBe(ResponseType.HTML);
  });
});
