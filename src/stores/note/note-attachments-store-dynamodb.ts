import { DataMapper } from "@aws/dynamodb-data-mapper";
import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";
import { NoteAttachment } from "../../model/note-model";
import { AttributePath, FunctionExpression } from "@aws/dynamodb-expressions";
import { NoteAttachmentsStore } from "./note-attachments-store";

const NOTE_ATTACHMENTS__TABLE_NAME = "notes-webserver-notebook";

@table(NOTE_ATTACHMENTS__TABLE_NAME)
export class NoteAttachmentEntity implements NoteAttachment {
  @hashKey()
  owner: string;

  @rangeKey()
  sortKey: string;

  @attribute()
  id: string;

  @attribute()
  noteID: string;

  @attribute()
  name: string;

  @attribute()
  objectKey: string;

  @attribute()
  createdAt: string;
}

interface NoteAttachmentsStoreDynamodbProps {
  dataMapper: DataMapper;
}

export class NoteAttachmentsStoreDynamodb implements NoteAttachmentsStore {
  constructor(private properties: NoteAttachmentsStoreDynamodbProps) {}
  public async add(attachment: NoteAttachment): Promise<void> {
    try {
      // prepend notebook id to note id:
      attachment.id = `${attachment.noteID}-${attachment.id}`;
      const entity = Object.assign(new NoteAttachmentEntity(), attachment, {
        sortKey: `ATTACHMENT_${attachment.id}`,
      });
      const objectSaved = await this.properties.dataMapper.put(entity);
      console.info("Attachment saved", objectSaved);
    } catch (err) {
      console.error("Error adding attachment: ", err);
      throw err;
    }
  }
  public async listAllForNote(
    owner: string,
    noteID: string
  ): Promise<NoteAttachment[]> {
    try {
      console.log(
        `[NoteAttachmentsStoreDynamodb] listing all attachments for owner ${owner} for note ${noteID}`
      );
      const r: NoteAttachment[] = [];
      for await (const entity of this.properties.dataMapper.query(
        NoteAttachmentEntity,
        {
          type: "And",
          conditions: [
            { type: "Equals", subject: "owner", object: owner },
            new FunctionExpression(
              "begins_with",
              new AttributePath("sortKey"),
              `ATTACHMENT_${noteID}`
            ),
          ],
        }
      )) {
        r.push({
          ...entity,
        });
      }
      return r;
    } catch (err) {
      console.log("No attachments found for note", owner, err);
      return [];
    }
  }
}
