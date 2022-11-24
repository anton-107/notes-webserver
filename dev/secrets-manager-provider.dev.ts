import { SecretsManager } from "aws-sdk";

import { SecretsManagerProvider } from "./../src/secrets/secrets-manager-provider";

const TEST_SECRET_NAME = "dev-notes-webserver-jwt-secret";
const TEST_SECRET_VALUE = "test-secret-value";
const CREATE_SECRET_BEFORE_TESTS = false;

describe("SecretsManagerProvider: development test", () => {
  beforeAll(async function () {
    if (!CREATE_SECRET_BEFORE_TESTS) {
      console.log("Skipping creating the test table");
      return;
    }
    try {
      const secretsManager = new SecretsManager();
      console.log("Creating a test secret");
      const response = await secretsManager
        .createSecret({
          Name: TEST_SECRET_NAME,
          SecretString: TEST_SECRET_VALUE,
        })
        .promise();
      console.log("Test secret creation response", response);
    } catch (err) {
      console.warn("Error creating a secret: ", err);
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
