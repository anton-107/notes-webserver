import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";
import { NoteStore } from "./note-store";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import { FunctionExpression, AttributePath } from "@aws/dynamodb-expressions";
import { Notebook } from "../../model/notebook-model";
import { Note, NoteType } from "../../model/note-model";

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
  notebook: Notebook;

  @attribute()
  type: NoteType;

  @attribute()
  content: string;

  @attribute()
  extensionProperties?: { [key: string]: string };
}

interface NoteStoreDynamodbProps {
  dataMapper: DataMapper;
}

export class NoteStoreDynamodb implements NoteStore {
  constructor(private properties: NoteStoreDynamodbProps) {}
  public async add(note: Note): Promise<void> {
    try {
      // prepend notebook id to note id:
      note.id = `${note.notebook.id}-${note.id}`;
      const entity = Object.assign(new NoteEntity(), note, {
        sortKey: `NOTE_${note.id}`,
      });
      const objectSaved = await this.properties.dataMapper.put(entity);
      console.info("Note saved", objectSaved);
    } catch (err) {
      console.error("Error adding note: ", err);
      throw err;
    }
  }
  public async listAll(owner: string): Promise<Note[]> {
    try {
      console.log(`[NoteStoreDynamodb] fetching up notes for owner ${owner}`);
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
      console.log("No notes found for user", owner, err);
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
      console.error(`Could not find note for ${owner}/${id}`, err);
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
      console.error(`Could not delete note for ${owner}/${id}`, err);
      throw err;
    }
  }
  public async editOne(note: Note): Promise<void> {
    try {
      await this.properties.dataMapper.update(
        Object.assign(new NoteEntity(), { sortKey: `NOTE_${note.id}` }, note)
      );
    } catch (err) {
      console.error("Could not edit note", note, err);
      throw err;
    }
  }
  public async listAllInNotebook(
    owner: string,
    notebookID: string
  ): Promise<Note[]> {
    try {
      console.log(
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
      console.log("No notes found for user", owner, err);
      return [];
    }
  }
}
