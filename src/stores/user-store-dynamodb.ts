import { User, UserStore } from "authentication-module/dist/authenticator";
import {
  table,
  hashKey,
  rangeKey,
  attribute,
} from "@aws/dynamodb-data-mapper-annotations";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import DynamoDB = require("aws-sdk/clients/dynamodb");

@table("notes-webserver-users")
class UserEntity implements User {
  @hashKey()
  username: string;

  @rangeKey()
  sortKey: string;

  @attribute()
  passwordHash: string;
}

interface UserStoreDynamodbProps {
  dataMapper: DataMapper;
}

export class UserStoreDynamodb implements UserStore {
  constructor(private properties: UserStoreDynamodbProps) {}

  public async getUserByName(username: string): Promise<User> {
    try {
      const entity = await this.properties.dataMapper.get(
        Object.assign(new UserEntity(), { name: username })
      );
      return {
        username: entity.name,
        passwordHash: entity.passwordHash,
      };
    } catch (err) {
      console.log("No user found", username);
      return null;
    }
  }
  public async addUser(user: User): Promise<void> {
    try {
      const entity = Object.assign(new UserEntity(), user);
      const objectSaved = await this.properties.dataMapper.put(entity);
      console.info("User saved", objectSaved);
    } catch (err) {
      console.error('Error adding user: ', err)
      throw err;
    }
  }
}
