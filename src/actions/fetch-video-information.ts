import { dependenciesConfiguration } from "../configuration/configuration";
import { AttachmentsStore } from "../stores/attachments/attachments-store";
import { StreamEvent, unmarshallRecordToNote } from "./dynamodb-stream-source";

export interface YoutubeParser {
  parseCaptionsURL(videoID: string): Promise<string[]>;
  downloadCaptions(captionURL: string): Promise<string>;
}

interface FetchVideoInformationProperties {
  parser: YoutubeParser;
  attachmentsStore: AttachmentsStore;
}

interface FetchVideoInformationAction {
  videoURL: string;
}

interface FetchVideoInformationActionResult {
  actionMessage:
    | "success"
    | "videoURL is not supported"
    | "could not find video id";
  captionsURL?: string[];
}

export class FetchVideoInformation {
  constructor(private properties: FetchVideoInformationProperties) {}
  public async run(
    actionTrigger: FetchVideoInformationAction
  ): Promise<FetchVideoInformationActionResult> {
    if (!actionTrigger.videoURL.startsWith("https://www.youtube.com")) {
      return { actionMessage: "videoURL is not supported" };
    }
    const url = new URL(actionTrigger.videoURL);
    const videoID = url.searchParams.get("v");
    if (!videoID) {
      return { actionMessage: "could not find video id" };
    }
    const captionsURL = await this.properties.parser.parseCaptionsURL(videoID);
    for (const url of captionsURL) {
      const captionsContent = await this.properties.parser.downloadCaptions(
        url
      );
      const attachmentID = await this.properties.attachmentsStore.persist(
        captionsContent
      );
      console.log("Persisted attachment with id ", attachmentID);
    }
    return { actionMessage: "success", captionsURL };
  }
}

export async function runFetchVideoInformation(
  event: StreamEvent
): Promise<undefined | FetchVideoInformationActionResult> {
  const configuration = dependenciesConfiguration({});
  const action = new FetchVideoInformation({
    parser: configuration.youtubeParser,
    attachmentsStore: configuration.attachmentsStore,
  });
  for (const record of event.Records) {
    if (record.eventName !== "INSERT") {
      console.log("Ignoring non-INSERT event", record.eventName);
      return;
    }
    const note = unmarshallRecordToNote(record.dynamodb.NewImage);
    if (!note.extensionProperties) {
      console.log("Ignoring a note without extensionProperties", note);
      return;
    }
    if (!note.type) {
      console.log("Ignoring a note without a type", note);
      return;
    }
    if (note.type.type !== "youtube-video") {
      console.log("Ignoring a non youtube-video note", note);
      return;
    }
    if (!note.extensionProperties.youtubeURL) {
      console.log(
        "Ignoring a note without extensionProperties.youtubeURL set",
        note
      );
      return;
    }
    const result = await action.run({
      videoURL: note.extensionProperties.youtubeURL,
    });
    console.log("action result", result);
    return result;
  }
}
