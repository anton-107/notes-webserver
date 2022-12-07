import { YoutubeParser } from "../../actions/fetch-video-information/interfaces";
export declare class NoOpYoutubeParser implements YoutubeParser {
    parseCaptionsURL(): Promise<string[]>;
    downloadCaptions(): Promise<string>;
}
