import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";

import { Logger } from "../logger/logger";
import { NoteAttachmentsStoreDynamodb } from "../stores/note/note-attachments-store-dynamodb";
import { NoteStoreDynamodb } from "../stores/note/note-store-dynamodb";
import { ServiceConfigurationOverrides } from "./interfaces";

export const noteStoreDynamoConfiguration = (
  logger: Logger
): ServiceConfigurationOverrides => {
  const r: ServiceConfigurationOverrides = {};
  r.noteStore = new NoteStoreDynamodb({
    logger,
    dataMapper: new DataMapper({ client: new DynamoDB() }),
  });
  return r;
};

export const noteAttachmentsStoreDynamoConfiguration = (
  logger: Logger
): ServiceConfigurationOverrides => {
  const r: ServiceConfigurationOverrides = {};
  r.noteAttachmentsStore = new NoteAttachmentsStoreDynamodb({
    logger,
    dataMapper: new DataMapper({ client: new DynamoDB() }),
  });
  return r;
};
