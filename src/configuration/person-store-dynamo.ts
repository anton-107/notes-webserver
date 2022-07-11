import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";
import { PersonStoreDynamodb } from "../stores/person/person-store-dynamodb";
import { ServiceConfigurationOverrides } from "./configuration";

export const personStoreDynamoConfiguration =
  (): ServiceConfigurationOverrides => {
    const r: ServiceConfigurationOverrides = {};
    r.personStore = new PersonStoreDynamodb({
      dataMapper: new DataMapper({ client: new DynamoDB() }),
    });
    return r;
  };
