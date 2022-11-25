import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";

import { Logger } from "../logger/logger";
import { PersonStoreDynamodb } from "../stores/person/person-store-dynamodb";
import { ServiceConfigurationOverrides } from "./configuration";

export const personStoreDynamoConfiguration = (
  logger: Logger
): ServiceConfigurationOverrides => {
  const r: ServiceConfigurationOverrides = {};
  r.personStore = new PersonStoreDynamodb({
    logger,
    dataMapper: new DataMapper({ client: new DynamoDB() }),
  });
  return r;
};
