import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";

import { Logger } from "../logger/logger";
import { NotebookStoreDynamodb } from "../stores/notebook/notebook-store-dynamodb";
import { ServiceConfigurationOverrides } from "./interfaces";

export const notebookStoreDynamoConfiguration = (
  logger: Logger
): ServiceConfigurationOverrides => {
  const r: ServiceConfigurationOverrides = {};
  r.notebookStore = new NotebookStoreDynamodb({
    logger,
    dataMapper: new DataMapper({ client: new DynamoDB() }),
  });
  return r;
};
