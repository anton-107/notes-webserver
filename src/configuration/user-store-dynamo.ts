import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";

import { Logger } from "../logger/logger";
import { UserStoreDynamodb } from "../stores/user/user-store-dynamodb";
import { ServiceConfigurationOverrides } from "./interfaces";

export const userStoreDynamoConfiguration = (
  logger: Logger
): ServiceConfigurationOverrides => {
  const r: ServiceConfigurationOverrides = {};
  r.userStore = new UserStoreDynamodb({
    logger,
    dataMapper: new DataMapper({ client: new DynamoDB() }),
  });
  return r;
};
