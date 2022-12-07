export interface YoutubeParser {
    parseCaptionsURL(videoID: string): Promise<string[]>;
    downloadCaptions(captionURL: string): Promise<string>;
}
