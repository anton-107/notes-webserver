import { YoutubeParser } from "../../actions/fetch-video-information";
export declare class NoOpYoutubeParser implements YoutubeParser {
    parseCaptionsURL(): Promise<string[]>;
    downloadCaptions(): Promise<string>;
}
