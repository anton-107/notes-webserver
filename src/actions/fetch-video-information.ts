import { YoutubeParser } from "youtube-module/dist/youtube-parser";

interface FetchVideoInformationProperties {
  parser: YoutubeParser;
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
    return { actionMessage: "success", captionsURL };
  }
}
