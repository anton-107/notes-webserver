import { SecretsManager } from "aws-sdk";
import { AWSError, Request } from "aws-sdk";
import { anything, instance, mock, when } from "ts-mockito";

import { LoggerBunyan } from "../../src/logger/logger-bunyan";
import { SecretsManagerProvider } from "./../../src/secrets/secrets-manager-provider";

const logger = new LoggerBunyan();

describe("SecretsManagerProvider", () => {
  it("should a read secret from AWS Secrets Manager", async () => {
    const secretsManager = mock<SecretsManager>();
    when(secretsManager.getSecretValue(anything())).thenReturn({
      promise: () => {
        return Promise.resolve({ SecretString: "some-secret-value" });
      },
    } as unknown as Request<SecretsManager.Types.GetSecretValueResponse, AWSError>);
    const secretsManagerProvider = new SecretsManagerProvider({
      logger,
      secretID: "test-secret-id",
      secretsManager: instance(secretsManager),
    });
    const secret = await secretsManagerProvider.getSecretKey();
    expect(secret).toBe("some-secret-value");
  });
  it("should throw an error is secret returned by AWS Secrets Manager is empty", async () => {
    const secretsManager = mock<SecretsManager>();
    when(secretsManager.getSecretValue(anything())).thenReturn({
      promise: () => {
        return Promise.resolve({ SecretString: "" });
      },
    } as unknown as Request<SecretsManager.Types.GetSecretValueResponse, AWSError>);
    const secretsManagerProvider = new SecretsManagerProvider({
      logger,
      secretID: "test-secret-id",
      secretsManager: instance(secretsManager),
    });
    await expect(
      async () => await secretsManagerProvider.getSecretKey()
    ).rejects.toBe("SecretsManager read error");
  });
});
