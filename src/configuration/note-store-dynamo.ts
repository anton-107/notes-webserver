import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
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
