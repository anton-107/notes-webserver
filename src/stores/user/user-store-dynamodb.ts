import { DataMapper } from "@aws/dynamodb-data-mapper";
import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";
import { User, UserStore } from "authentication-module/dist/authenticator";

import { Logger } from "../../logger/logger";

const USERS_TABLE_NAME = "notes-webserver-users";

@table(USERS_TABLE_NAME)
export class UserEntity implements User {
  @hashKey()
  username: string;

  @rangeKey()
  sortKey: string;

  @attribute()
  passwordHash: string;
}

interface UserStoreDynamodbProps {
  logger: Logger;
  dataMapper: DataMapper;
}

export class UserStoreDynamodb implements UserStore {
  constructor(private properties: UserStoreDynamodbProps) {}

  public async getUserByName(username: string): Promise<User> {
    try {
      this.properties.logger.info(
        `[UserStoreDynamodb] fetching up user ${username}`
      );
      const entity = await this.properties.dataMapper.get(
        Object.assign(new UserEntity(), { username, sortKey: "USER" })
      );
      return {
        username: entity.username,
        passwordHash: entity.passwordHash,
      };
    } catch (err) {
      this.properties.logger.info("No user found", { username, error: err });
      return null;
    }
  }
  public async addUser(user: User): Promise<void> {
    try {
      const entity = Object.assign(new UserEntity(), user, {
        sortKey: "USER",
      });
      const objectSaved = await this.properties.dataMapper.put(entity);
      this.properties.logger.info("User saved", { data: objectSaved });
    } catch (err) {
      this.properties.logger.error("Error adding user: ", { error: err });
      throw err;
    }
  }
}
