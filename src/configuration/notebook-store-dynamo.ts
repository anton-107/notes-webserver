import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import { NotebookStoreDynamodb } from "../stores/notebook-store-dynamodb";
import { ServiceConfigurationOverrides } from "./configuration";

export const notebookStoreDynamoConfiguration =
  (): ServiceConfigurationOverrides => {
    const r: ServiceConfigurationOverrides = {};
    r.notebookStore = new NotebookStoreDynamodb({
      dataMapper: new DataMapper({ client: new DynamoDB() }),
    });
    return r;
  };
