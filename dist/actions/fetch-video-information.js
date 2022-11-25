"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runFetchVideoInformation = exports.FetchVideoInformation = void 0;
const short_uuid_1 = require("short-uuid");
const configuration_1 = require("../configuration/configuration");
const dynamodb_stream_source_1 = require("./dynamodb-stream-source");
class FetchVideoInformation {
    constructor(properties) {
        this.properties = properties;
    }
    async run(actionTrigger) {
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
            const captionsContent = await this.properties.parser.downloadCaptions(url);
            const attachmentID = await this.properties.attachmentsStore.persist(captionsContent);
            this.properties.logger.info("Persisted attachment with id ", {
                data: attachmentID,
            });
            const now = new Date().toISOString();
            const noteAttachment = {
                id: (0, short_uuid_1.generate)(),
                noteID: actionTrigger.noteID,
                objectKey: attachmentID,
                owner: actionTrigger.noteOwner,
                createdAt: now,
                name: `Video captions (${captionsURL})`,
                fileExtension: "xml",
            };
            await this.properties.noteAttachmentsStore.add(noteAttachment);
            this.properties.logger.info("Persisted note attachment with id ", {
                data: noteAttachment.id,
            });
        }
        return { actionMessage: "success", captionsURL };
    }
}
exports.FetchVideoInformation = FetchVideoInformation;
async function runFetchVideoInformation(event) {
    const configuration = (0, configuration_1.dependenciesConfiguration)({});
    const action = new FetchVideoInformation({
        logger: configuration.logger,
        parser: configuration.youtubeParser,
        attachmentsStore: configuration.attachmentsStore,
        noteAttachmentsStore: configuration.noteAttachmentsStore,
    });
    for (const record of event.Records) {
        if (record.eventName !== "INSERT") {
            configuration.logger.info("Ignoring non-INSERT event", {
                data: record.eventName,
            });
            return;
        }
        const note = (0, dynamodb_stream_source_1.unmarshallRecordToNote)(record.dynamodb.NewImage);
        if (!note.extensionProperties) {
            configuration.logger.info("Ignoring a note without extensionProperties", {
                data: note,
            });
            return;
        }
        if (!note.type) {
            configuration.logger.info("Ignoring a note without a type", {
                data: note,
            });
            return;
        }
        if (note.type.type !== "youtube-video") {
            configuration.logger.info("Ignoring a non youtube-video note", {
                data: note,
            });
            return;
        }
        if (!note.extensionProperties.youtubeURL) {
            configuration.logger.info("Ignoring a note without extensionProperties.youtubeURL set", { data: note });
            return;
        }
        const result = await action.run({
            noteID: note.id,
            noteOwner: note.owner,
            videoURL: note.extensionProperties.youtubeURL,
        });
        configuration.logger.info("action result", { data: result });
        return result;
    }
}
exports.runFetchVideoInformation = runFetchVideoInformation;
//# sourceMappingURL=fetch-video-information.js.map