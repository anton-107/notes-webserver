import { AttachmentsStore } from "../stores/attachments/attachments-store";
import { NoteAttachmentsStore } from "../stores/note/note-attachments-store";
import { StreamEvent } from "./dynamodb-stream-source";
export interface YoutubeParser {
    parseCaptionsURL(videoID: string): Promise<string[]>;
    downloadCaptions(captionURL: string): Promise<string>;
}
interface FetchVideoInformationProperties {
    parser: YoutubeParser;
    attachmentsStore: AttachmentsStore;
    noteAttachmentsStore: NoteAttachmentsStore;
}
interface FetchVideoInformationAction {
    noteOwner: string;
    noteID: string;
    videoURL: string;
}
interface FetchVideoInformationActionResult {
    actionMessage: "success" | "videoURL is not supported" | "could not find video id";
    captionsURL?: string[];
}
export declare class FetchVideoInformation {
    private properties;
    constructor(properties: FetchVideoInformationProperties);
    run(actionTrigger: FetchVideoInformationAction): Promise<FetchVideoInformationActionResult>;
}
export declare function runFetchVideoInformation(event: StreamEvent): Promise<undefined | FetchVideoInformationActionResult>;
export {};
