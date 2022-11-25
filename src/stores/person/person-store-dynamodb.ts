import { DataMapper } from "@aws/dynamodb-data-mapper";
import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";

import { Logger } from "../../logger/logger";
import { Person } from "../../model/person-model";
import { PersonStore } from "./person-store";

const PERSON_TABLE_NAME = "notes-webserver-people";

@table(PERSON_TABLE_NAME)
export class PersonEntity implements Person {
  @hashKey()
  manager: string;

  @rangeKey()
  sortKey: string;

  @attribute()
  name: string;

  @attribute()
  email: string;

  @attribute()
  id: string;
}

interface PersonStoreDynamodbProps {
  logger: Logger;
  dataMapper: DataMapper;
}

export class PersonStoreDynamodb implements PersonStore {
  constructor(private properties: PersonStoreDynamodbProps) {}
  public async add(person: Person): Promise<void> {
    try {
      const entity = Object.assign(new PersonEntity(), person, {
        sortKey: `PERSON_${person.id}`,
      });
      const objectSaved = await this.properties.dataMapper.put(entity);
      this.properties.logger.info("Person saved", { data: objectSaved });
    } catch (err) {
      this.properties.logger.error("Error adding person: ", { error: err });
      throw err;
    }
  }
  public async listAll(manager: string): Promise<Person[]> {
    try {
      this.properties.logger.info(
        `[PersonStoreDynamodb] fetching up people for manager ${manager}`
      );
      const r: Person[] = [];
      for await (const entity of this.properties.dataMapper.query(
        PersonEntity,
        { manager }
      )) {
        r.push({
          name: entity.name,
          email: entity.email,
          manager: entity.manager,
          id: entity.id,
        });
      }
      return r;
    } catch (err) {
      this.properties.logger.info("No people found for manager", {
        owner: manager,
        error: err,
      });
      return [];
    }
  }
  public async getOne(manager: string, id: string): Promise<Person | null> {
    try {
      const entity = await this.properties.dataMapper.get(
        Object.assign(new PersonEntity(), {
          manager,
          sortKey: `PERSON_${id}`,
        })
      );
      return {
        manager: entity.manager,
        id: entity.id,
        name: entity.name,
        email: entity.email,
      };
    } catch (err) {
      this.properties.logger.error(
        `Could not find peson for ${manager}/${id}`,
        { error: err }
      );
      return null;
    }
  }
  public async deleteOne(manager: string, id: string): Promise<void> {
    try {
      await this.properties.dataMapper.delete(
        Object.assign(new PersonEntity(), {
          manager,
          sortKey: `PERSON_${id}`,
        })
      );
    } catch (err) {
      this.properties.logger.error(
        `Could not delete person for ${manager}/${id}`,
        { error: err }
      );
      throw err;
    }
  }
  public async editOne(person: Person): Promise<void> {
    try {
      await this.properties.dataMapper.update(
        Object.assign(
          new PersonEntity(),
          { sortKey: `PERSON_${person.id}` },
          person
        )
      );
    } catch (err) {
      this.properties.logger.error("Could not edit person", {
        data: person,
        error: err,
      });
      throw err;
    }
  }
}
