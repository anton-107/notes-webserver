import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";

import { NoteAttachmentsStoreDynamodb } from "../stores/note/note-attachments-store-dynamodb";
import { NoteStoreDynamodb } from "../stores/note/note-store-dynamodb";
import { ServiceConfigurationOverrides } from "./configuration";

export const noteStoreDynamoConfiguration =
  (): ServiceConfigurationOverrides => {
    const r: ServiceConfigurationOverrides = {};
    r.noteStore = new NoteStoreDynamodb({
      dataMapper: new DataMapper({ client: new DynamoDB() }),
    });
    return r;
  };

export const noteAttachmentsStoreDynamoConfiguration =
  (): ServiceConfigurationOverrides => {
    const r: ServiceConfigurationOverrides = {};
    r.noteAttachmentsStore = new NoteAttachmentsStoreDynamodb({
      dataMapper: new DataMapper({ client: new DynamoDB() }),
    });
    return r;
  };
