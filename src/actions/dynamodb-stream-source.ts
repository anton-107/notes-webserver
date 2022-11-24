import { getSchema } from "@aws/dynamodb-data-mapper";
import { unmarshallItem } from "@aws/dynamodb-data-marshaller";
import { DynamoDBStreams } from "aws-sdk";

import { Note } from "../model/note-model";
import { NoteEntity } from "../stores/note/note-store-dynamodb";

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
