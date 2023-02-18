import { DataMapper } from "@aws/dynamodb-data-mapper";
import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";
import { AttributePath, FunctionExpression } from "@aws/dynamodb-expressions";

import { Logger } from "../../logger/logger";
import { Note, NoteType } from "../../model/note-model";
import { NotebookColumnValueType } from "../../model/notebook-model";
import { NoteStore } from "./note-store";

const NOTES_TABLE_NAME = "notes-webserver-notebook";

@table(NOTES_TABLE_NAME)
export class NoteEntity implements Note {
  @hashKey()
  owner: string;

  @rangeKey()
  sortKey: string;

  @attribute()
  id: string;

  @attribute()
  notebookID: string;

  @attribute()
  type: NoteType;

  @attribute()
  content: string;

  @attribute()
  extensionProperties?: { [key: string]: string };

  @attribute()
  columnValues?: { [key: string]: NotebookColumnValueType };
}

interface NoteStoreDynamodbProps {
  logger: Logger;
  dataMapper: DataMapper;
}

export class NoteStoreDynamodb implements NoteStore {
  constructor(private properties: NoteStoreDynamodbProps) {}
  public async add(note: Note): Promise<void> {
    try {
      // prepend notebook id to note id:
      note.id = `${note.notebookID}-${note.id}`;
      const entity = Object.assign(new NoteEntity(), note, {
        sortKey: `NOTE_${note.id}`,
      });
      const objectSaved = await this.properties.dataMapper.put(entity);
      this.properties.logger.info("Note saved", { data: objectSaved });
    } catch (err) {
      this.properties.logger.error("Error adding note: ", { error: err });
      throw err;
    }
  }
  public async listAll(owner: string): Promise<Note[]> {
    try {
      this.properties.logger.info(
        `[NoteStoreDynamodb] fetching up notes for owner ${owner}`
      );
      const r: Note[] = [];
      for await (const entity of this.properties.dataMapper.query(NoteEntity, {
        type: "And",
        conditions: [
          { type: "Equals", subject: "owner", object: owner },
          new FunctionExpression(
            "begins_with",
            new AttributePath("sortKey"),
            "NOTE_"
          ),
        ],
      })) {
        r.push({
          ...entity,
        });
      }
      return r;
    } catch (err) {
      this.properties.logger.info("No notes found for user", {
        owner,
        error: err,
      });
      return [];
    }
  }
  public async getOne(owner: string, id: string): Promise<Note | null> {
    try {
      const entity = await this.properties.dataMapper.get(
        Object.assign(new NoteEntity(), {
          owner,
          sortKey: `NOTE_${id}`,
        })
      );
      return {
        ...entity,
      };
    } catch (err) {
      this.properties.logger.error(`Could not find note for ${owner}/${id}`, {
        error: err,
      });
      return null;
    }
  }
  public async deleteOne(owner: string, id: string): Promise<void> {
    try {
      await this.properties.dataMapper.delete(
        Object.assign(new NoteEntity(), {
          owner,
          sortKey: `NOTE_${id}`,
        })
      );
    } catch (err) {
      this.properties.logger.error(`Could not delete note for ${owner}/${id}`, {
        error: err,
      });
      throw err;
    }
  }
  public async deleteAllInNotebook(
    owner: string,
    notebookID: string
  ): Promise<void> {
    this.properties.logger.info(
      `Deleting all notes in ${owner}'s notebook with id=${notebookID}`
    );
    const notesToRemove = await this.listAllInNotebook(owner, notebookID);
    const entitiesToRemove = notesToRemove.map((x) =>
      Object.assign(new NoteEntity(), x)
    );
    for await (const found of this.properties.dataMapper.batchDelete(
      entitiesToRemove
    )) {
      this.properties.logger.info("Note deleted", { data: found });
    }
  }
  public async editOne(note: Note): Promise<void> {
    try {
      await this.properties.dataMapper.update(
        Object.assign(new NoteEntity(), { sortKey: `NOTE_${note.id}` }, note)
      );
    } catch (err) {
      this.properties.logger.error("Could not edit note", {
        data: note,
        error: err,
      });
      throw err;
    }
  }
  public async listAllInNotebook(
    owner: string,
    notebookID: string
  ): Promise<Note[]> {
    try {
      this.properties.logger.info(
        `[NoteStoreDynamodb] listing all notes for owner ${owner} in ${notebookID}`
      );
      const r: Note[] = [];
      for await (const entity of this.properties.dataMapper.query(NoteEntity, {
        type: "And",
        conditions: [
          { type: "Equals", subject: "owner", object: owner },
          new FunctionExpression(
            "begins_with",
            new AttributePath("sortKey"),
            `NOTE_${notebookID}`
          ),
        ],
      })) {
        r.push({
          ...entity,
        });
      }
      return r;
    } catch (err) {
      this.properties.logger.info(
        "No notes found for user (listing all in notebook)",
        {
          owner,
          entityID: notebookID,
          error: err,
        }
      );
      return [];
    }
  }
}
