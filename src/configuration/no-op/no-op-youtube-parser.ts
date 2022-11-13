import { YoutubeParser } from "../../actions/fetch-video-information";

export class NoOpYoutubeParser implements YoutubeParser {
  public async parseCaptionsURL(): Promise<string[]> {
    return [];
  }
  public async downloadCaptions(): Promise<string> {
    return "";
  }
}
