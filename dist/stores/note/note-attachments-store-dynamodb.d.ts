import { DataMapper } from "@aws/dynamodb-data-mapper";
import { NoteAttachment } from "../../model/note-model";
import { NoteAttachmentsStore } from "./note-attachments-store";
export declare class NoteAttachmentEntity implements NoteAttachment {
    owner: string;
    sortKey: string;
    id: string;
    noteID: string;
    name: string;
    objectKey: string;
    createdAt: string;
}
interface NoteAttachmentsStoreDynamodbProps {
    dataMapper: DataMapper;
}
export declare class NoteAttachmentsStoreDynamodb implements NoteAttachmentsStore {
    private properties;
    constructor(properties: NoteAttachmentsStoreDynamodbProps);
    add(attachment: NoteAttachment): Promise<void>;
    listAllForNote(owner: string, noteID: string): Promise<NoteAttachment[]>;
}
export {};
