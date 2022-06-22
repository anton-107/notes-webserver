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

  it("should set up notebook store in dynamodb", () => {
    process.env = Object.assign({}, process.env, {
      NOTEBOOK_STORE_TYPE: "dynamodb",
    });
    const config = dependenciesConfiguration({});
    expect(config.notebookStore).not.toBe(null);
  });

  it("should secrets manager provider as jwtSerializerSecretProvider", () => {
    process.env = Object.assign({}, process.env, {
      JWT_SERIALIZER_SECRET_ID: "jwtSerializerSecretRANDOM-STRING-SUFFIX",
    });
    const config = dependenciesConfiguration({});
    expect(config.jwtSerializerSecretProvider).not.toBe(null);
  });
});
