import { commonConfiguration } from "../../src/configuration/common";

describe("Common configuration", () => {
  it("should provide a default logger", () => {
    const config = commonConfiguration({});
    expect(config.logger).toBeDefined();
  });
});
