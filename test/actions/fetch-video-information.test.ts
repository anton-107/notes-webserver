import {
  FetchVideoInformation,
  runFetchVideoInformation,
  YoutubeParser,
} from "./../../src/actions/fetch-video-information";
import { mock, instance, when } from "ts-mockito";
import { marshallItem } from "@aws/dynamodb-data-marshaller";
import { getSchema } from "@aws/dynamodb-data-mapper";
import { NoteEntity } from "../../src/stores/note/note-store-dynamodb";
import {
  AttachmentsStore,
  InMemoryAttachmentsStore,
} from "../../src/stores/attachments/attachments-store";
import { NoOpYoutubeParser } from "../../src/configuration/no-op/no-op-youtube-parser";

describe("FetchVideoInformation", () => {
  describe("FetchVideoInformation action class", () => {
    it("should get captions url of a video and download those captions content", async () => {
      const parserMock = mock<YoutubeParser>();
      const attachmentsStore = new InMemoryAttachmentsStore();
      when(parserMock.parseCaptionsURL("some-video-id")).thenResolve([
        "some-caption-url",
      ]);
      const noopParser = new NoOpYoutubeParser();
      when(parserMock.downloadCaptions("some-caption-url")).thenResolve(
        await noopParser.downloadCaptions()
      );
      const action = new FetchVideoInformation({
        parser: instance(parserMock),
        attachmentsStore: attachmentsStore,
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
      const attachmentsStoreMock = mock<AttachmentsStore>();
      const action = new FetchVideoInformation({
        parser: instance(parserMock),
        attachmentsStore: instance(attachmentsStoreMock),
      });
      const result = await action.run({
        videoURL: "https://www.vimeo.com/watch?v=some-video-id&param=test",
      });
      expect(result.actionMessage).toBe("videoURL is not supported");
    });
    it("should return a message if a video id is not found in the url", async () => {
      const parserMock = mock<YoutubeParser>();
      const attachmentsStoreMock = mock<AttachmentsStore>();
      const action = new FetchVideoInformation({
        parser: instance(parserMock),
        attachmentsStore: instance(attachmentsStoreMock),
      });
      const result = await action.run({
        videoURL:
          "https://www.youtube.com/watch?video=some-video-id&param=test",
      });
      expect(result.actionMessage).toBe("could not find video id");
    });
  });
  describe("runFetchVideoInformation method", () => {
    it("should return undefined on a non-insert event", async () => {
      const result = await runFetchVideoInformation({
        Records: [{ eventName: "MODIFY", dynamodb: {} }],
      });
      expect(result).toBeUndefined();
    });
    it("should return undefined on a note that does not have extensionProperties", async () => {
      const result = await runFetchVideoInformation({
        Records: [
          {
            eventName: "INSERT",
            dynamodb: {
              NewImage: {},
            },
          },
        ],
      });
      expect(result).toBeUndefined();
    });
    it("should return undefined on a note that does not have a type", async () => {
      const result = await runFetchVideoInformation({
        Records: [
          {
            eventName: "INSERT",
            dynamodb: {
              NewImage: {
                extensionProperties: {},
              },
            },
          },
        ],
      });
      expect(result).toBeUndefined();
    });
    it("should return undefined on a note that has a type different than youtube-video", async () => {
      const result = await runFetchVideoInformation({
        Records: [
          {
            eventName: "INSERT",
            dynamodb: {
              NewImage: marshallItem(getSchema(NoteEntity.prototype), {
                extensionProperties: {},
                type: { type: "plaintext" },
              }),
            },
          },
        ],
      });
      expect(result).toBeUndefined();
    });
    it("should return undefined on a youtube-video note that does not have youtubeURL", async () => {
      const result = await runFetchVideoInformation({
        Records: [
          {
            eventName: "INSERT",
            dynamodb: {
              NewImage: marshallItem(getSchema(NoteEntity.prototype), {
                extensionProperties: {},
                type: { type: "youtube-video" },
              }),
            },
          },
        ],
      });
      expect(result).toBeUndefined();
    });
    it("should return an empty list (from no-op youtube parser) on a youtube-video", async () => {
      const result = await runFetchVideoInformation({
        Records: [
          {
            eventName: "INSERT",
            dynamodb: {
              NewImage: marshallItem(getSchema(NoteEntity.prototype), {
                extensionProperties: {
                  youtubeURL: "https://www.youtube.com/watch?v=xxx",
                },
                type: { type: "youtube-video" },
              }),
            },
          },
        ],
      });
      expect(result).toBeDefined();
    });
  });
});
