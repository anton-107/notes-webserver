import { FetchVideoInformation } from "./../../src/actions/fetch-video-information";
import { YoutubeParser } from "youtube-module/dist/youtube-parser";
import { mock, instance, when } from "ts-mockito";

describe("FetchVideoInformation action", () => {
  it("should return captions url of a video", async () => {
    const parserMock = mock<YoutubeParser>();
    when(parserMock.parseCaptionsURL("some-video-id")).thenResolve([
      "some-caption-url",
    ]);
    const action = new FetchVideoInformation({
      parser: instance(parserMock),
    });
    const result = await action.run({
      videoURL: "https://www.youtube.com/watch?v=some-video-id&param=test",
    });
    if (!result.captionsURL) {
      throw Error("Expected result.captionsURL to be defined");
    }
    expect(result.captionsURL.length).toBe(1);
    expect(result.captionsURL[0]).toBe("some-caption-url");
  });
  it("should return a message if a video url is not recognized", async () => {
    const parserMock = mock<YoutubeParser>();
    const action = new FetchVideoInformation({
      parser: instance(parserMock),
    });
    const result = await action.run({
      videoURL: "https://www.vimeo.com/watch?v=some-video-id&param=test",
    });
    expect(result.actionMessage).toBe("videoURL is not supported");
  });
  it("should return a message if a video id is not found in the url", async () => {
    const parserMock = mock<YoutubeParser>();
    const action = new FetchVideoInformation({
      parser: instance(parserMock),
    });
    const result = await action.run({
      videoURL: "https://www.youtube.com/watch?video=some-video-id&param=test",
    });
    expect(result.actionMessage).toBe("could not find video id");
  });
});
