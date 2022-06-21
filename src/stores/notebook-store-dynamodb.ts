import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";
import { Notebook, NotebookStore } from "./notebook-store";
import { v4 } from "uuid";
import { DataMapper } from "@aws/dynamodb-data-mapper";

const NOTEBOOK_TABLE_NAME = "notes-webserver-notebook";

@table(NOTEBOOK_TABLE_NAME)
export class NotebookEntity implements Notebook {
  @hashKey()
  owner: string;

  @rangeKey()
  sortKey: string;

  @attribute()
  name: string;
}

interface NotebookStoreDynamodbProps {
  dataMapper: DataMapper;
}

export class NotebookStoreDynamodb implements NotebookStore {
  constructor(private properties: NotebookStoreDynamodbProps) {}
  public async add(notebook: Notebook): Promise<void> {
    try {
      const entity = Object.assign(new NotebookEntity(), notebook, {
        sortKey: `NOTEBOOK_${Date.now()}_${v4()}`,
      });
      const objectSaved = await this.properties.dataMapper.put(entity);
      console.info("Notebook saved", objectSaved);
    } catch (err) {
      console.error("Error adding notebook: ", err);
      throw err;
    }
  }
  public async listAll(owner: string): Promise<Notebook[]> {
    try {
      console.log(
        `[NotebookStoreDynamodb] fetching up notebooks for owner ${owner}`
      );
      const r: Notebook[] = [];
      for await (const entity of this.properties.dataMapper.query(
        NotebookEntity,
        { owner }
      )) {
        r.push({
          name: entity.name,
          owner: entity.owner,
        });
      }
      return r;
    } catch (err) {
      console.log("No notebooks found for user", owner, err);
      return [];
    }
  }
}
