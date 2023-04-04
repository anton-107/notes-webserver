import { getSchema } from "@aws/dynamodb-data-mapper";
import { unmarshallItem } from "@aws/dynamodb-data-marshaller";
import { DynamoDBStreams } from "aws-sdk";
import { Note } from "notes-model/dist/note-model";
import { Notebook } from "notes-model/dist/notebook-model";

import { NoteEntity } from "../stores/note/note-store-dynamodb";
import { NotebookEntity } from "../stores/notebook/notebook-store-dynamodb";

export type EventName = "INSERT" | "MODIFY" | "REMOVE";
export interface StreamEvent {
  Records: {
    eventName: EventName;
    dynamodb: DynamoDBStreams.StreamRecord;
  }[];
}
export function unmarshallRecordToNote(
  image: AWS.DynamoDBStreams.AttributeMap
): Note {
  return unmarshallItem(getSchema(NoteEntity.prototype), image, NoteEntity);
}

export function unmarshallRecordToNotebook(
  image: AWS.DynamoDBStreams.AttributeMap
): Notebook {
  return unmarshallItem(
    getSchema(NotebookEntity.prototype),
    image,
    NotebookEntity
  );
}
