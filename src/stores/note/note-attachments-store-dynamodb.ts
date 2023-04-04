import { DataMapper } from "@aws/dynamodb-data-mapper";
import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";
import { AttributePath, FunctionExpression } from "@aws/dynamodb-expressions";
import { NoteAttachment } from "notes-model/dist/note-model";

import { Logger } from "../../logger/logger";
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
  fileExtension: string;

  @attribute()
  createdAt: string;
}

interface NoteAttachmentsStoreDynamodbProps {
  logger: Logger;
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
      this.properties.logger.info("Attachment saved", { data: objectSaved });
    } catch (err) {
      this.properties.logger.error("Error adding attachment: ", { error: err });
      throw err;
    }
  }
  public async listAllForNote(
    owner: string,
    noteID: string
  ): Promise<NoteAttachment[]> {
    try {
      this.properties.logger.info(
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
      this.properties.logger.info("No attachments found for note", {
        owner,
        error: err,
      });
      return [];
    }
  }
}
