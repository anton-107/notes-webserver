import { SecretsManager } from "aws-sdk";

import { dependenciesConfiguration } from "../src/configuration/configuration";
import { SecretsManagerProvider } from "./../src/secrets/secrets-manager-provider";

const TEST_SECRET_NAME = "dev-notes-webserver-jwt-secret";
const TEST_SECRET_VALUE = "test-secret-value";
const CREATE_SECRET_BEFORE_TESTS = false;

const config = dependenciesConfiguration({});
const logger = config.logger;

describe("SecretsManagerProvider: development test", () => {
  beforeAll(async function () {
    if (!CREATE_SECRET_BEFORE_TESTS) {
      logger.info("Skipping creating the test table");
      return;
    }
    try {
      const secretsManager = new SecretsManager();
      logger.info("Creating a test secret");
      const response = await secretsManager
        .createSecret({
          Name: TEST_SECRET_NAME,
          SecretString: TEST_SECRET_VALUE,
        })
        .promise();
      logger.info("Test secret creation response", { data: response });
    } catch (err) {
      logger.error("Error creating a secret: ", { error: err });
    }
  }, 30000);

  it("should read secret from SecretsManager", async () => {
    const secretsManagerProvider = new SecretsManagerProvider({
      secretsManager: new SecretsManager(),
      secretID: TEST_SECRET_NAME,
    });
    const secret = await secretsManagerProvider.getSecretKey();
    expect(secret).toBe(TEST_SECRET_VALUE);
  });
});
