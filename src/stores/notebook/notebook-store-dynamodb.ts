import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";
import { Notebook, NotebookStore } from "./notebook-store";
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

  @attribute()
  id: string;
}

interface NotebookStoreDynamodbProps {
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
          id: entity.id,
        });
      }
      return r;
    } catch (err) {
      console.log("No notebooks found for user", owner, err);
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
      };
    } catch (err) {
      console.error(`Could not find notebook for ${owner}/${id}`, err);
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
      console.error(`Could not delete notebook for ${owner}/${id}`, err);
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
      console.error("Could not edit notebook", notebook, err);
      throw err;
    }
  }
}
