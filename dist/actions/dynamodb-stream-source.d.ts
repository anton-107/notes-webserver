import { DynamoDBStreams } from "aws-sdk";
import { Note } from "../model/note-model";
import { Notebook } from "../model/notebook-model";
export declare type EventName = "INSERT" | "MODIFY" | "REMOVE";
export interface StreamEvent {
    Records: {
        eventName: EventName;
        dynamodb: DynamoDBStreams.StreamRecord;
    }[];
}
export declare function unmarshallRecordToNote(image: AWS.DynamoDBStreams.AttributeMap): Note;
export declare function unmarshallRecordToNotebook(image: AWS.DynamoDBStreams.AttributeMap): Notebook;
