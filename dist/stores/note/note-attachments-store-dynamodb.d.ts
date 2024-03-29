import { DataMapper } from "@aws/dynamodb-data-mapper";
import { NoteAttachment } from "notes-model/dist/note-model";
import { Logger } from "../../logger/logger";
import { NoteAttachmentsStore } from "./note-attachments-store";
export declare class NoteAttachmentEntity implements NoteAttachment {
    owner: string;
    sortKey: string;
    id: string;
    noteID: string;
    name: string;
    objectKey: string;
    fileExtension: string;
    createdAt: string;
}
interface NoteAttachmentsStoreDynamodbProps {
    logger: Logger;
    dataMapper: DataMapper;
}
export declare class NoteAttachmentsStoreDynamodb implements NoteAttachmentsStore {
    private properties;
    constructor(properties: NoteAttachmentsStoreDynamodbProps);
    add(attachment: NoteAttachment): Promise<void>;
    listAllForNote(owner: string, noteID: string): Promise<NoteAttachment[]>;
}
export {};
