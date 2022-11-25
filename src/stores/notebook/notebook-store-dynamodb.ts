import { DataMapper } from "@aws/dynamodb-data-mapper";
import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";
import { AttributePath, FunctionExpression } from "@aws/dynamodb-expressions";

import { Logger } from "../../logger/logger";
import {
  Notebook,
  NotebookSection,
  NotebookTableColumn,
} from "../../model/notebook-model";
import { NotebookStore } from "./notebook-store";

const NOTEBOOK_TABLE_NAME = "notes-webserver-notebook";

@table(NOTEBOOK_TABLE_NAME)
export class NotebookEntity implements Notebook {
  @hashKey()
  owner: string;

  @rangeKey()
  sortKey: string;

  @attribute()
  name: string;

  @attribute()
  id: string;

  @attribute()
  sections: NotebookSection[];

  @attribute()
  tableColumns: NotebookTableColumn[];

  @attribute()
  createdAt: string;

  @attribute()
  updatedAt: string;
}

interface NotebookStoreDynamodbProps {
  logger: Logger;
  dataMapper: DataMapper;
}

export class NotebookStoreDynamodb implements NotebookStore {
  constructor(private properties: NotebookStoreDynamodbProps) {}
  public async add(notebook: Notebook): Promise<void> {
    try {
      const entity = Object.assign(new NotebookEntity(), notebook, {
        sortKey: `NOTEBOOK_${notebook.id}`,
      });
      const objectSaved = await this.properties.dataMapper.put(entity);
      this.properties.logger.info("Note saved", { data: objectSaved });
    } catch (err) {
      this.properties.logger.error("Error adding notebook: ", { error: err });
      throw err;
    }
  }
  public async listAll(owner: string): Promise<Notebook[]> {
    try {
      this.properties.logger.info(
        `[NotebookStoreDynamodb] fetching up notebooks for owner ${owner}`
      );
      const r: Notebook[] = [];
      for await (const entity of this.properties.dataMapper.query(
        NotebookEntity,
        {
          type: "And",
          conditions: [
            { type: "Equals", subject: "owner", object: owner },
            new FunctionExpression(
              "begins_with",
              new AttributePath("sortKey"),
              "NOTEBOOK_"
            ),
          ],
        }
      )) {
        r.push({
          name: entity.name,
          owner: entity.owner,
          id: entity.id,
          sections: entity.sections,
          tableColumns: entity.tableColumns,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
        });
      }
      return r;
    } catch (err) {
      this.properties.logger.info("No notebooks found for user", {
        owner,
        error: err,
      });
      return [];
    }
  }
  public async getOne(owner: string, id: string): Promise<Notebook | null> {
    try {
      const entity = await this.properties.dataMapper.get(
        Object.assign(new NotebookEntity(), {
          owner,
          sortKey: `NOTEBOOK_${id}`,
        })
      );
      return {
        owner: entity.owner,
        id: entity.id,
        name: entity.name,
        sections: entity.sections,
        tableColumns: entity.tableColumns,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      };
    } catch (err) {
      this.properties.logger.error(
        `Could not find notebook for ${owner}/${id}`,
        { error: err }
      );
      return null;
    }
  }
  public async deleteOne(owner: string, id: string): Promise<void> {
    try {
      await this.properties.dataMapper.delete(
        Object.assign(new NotebookEntity(), {
          owner,
          sortKey: `NOTEBOOK_${id}`,
        })
      );
    } catch (err) {
      this.properties.logger.error(
        `Could not delete notebook for ${owner}/${id}`,
        { error: err }
      );
      throw err;
    }
  }
  public async editOne(notebook: Notebook): Promise<void> {
    try {
      await this.properties.dataMapper.update(
        Object.assign(
          new NotebookEntity(),
          { sortKey: `NOTEBOOK_${notebook.id}` },
          notebook
        )
      );
    } catch (err) {
      this.properties.logger.error("Could not edit notebook", {
        data: notebook,
        error: err,
      });
      throw err;
    }
  }
}
