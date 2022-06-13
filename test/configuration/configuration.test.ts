import { dependenciesConfiguration } from "../../src/configuration/configuration";

describe("Configuration", () => {
  const env = Object.assign({}, process.env);

  afterEach(() => {
    process.env = env;
  });

  it("should set up user store in dynamodb", () => {
    process.env = Object.assign({}, process.env, {
      USER_STORE_TYPE: "dynamodb",
    });
    const config = dependenciesConfiguration({});
    expect(config.userStore).not.toBe(null);
  });
});
