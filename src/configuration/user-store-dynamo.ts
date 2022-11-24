import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DynamoDB } from "aws-sdk";

import { UserStoreDynamodb } from "../stores/user/user-store-dynamodb";
import { ServiceConfigurationOverrides } from "./configuration";

export const userStoreDynamoConfiguration =
  (): ServiceConfigurationOverrides => {
    const r: ServiceConfigurationOverrides = {};
    r.userStore = new UserStoreDynamodb({
      dataMapper: new DataMapper({ client: new DynamoDB() }),
    });
    return r;
  };
