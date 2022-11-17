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
            console.log("Persisted attachment with id ", attachmentID);
            const now = new Date().toISOString();
            const noteAttachment = {
                id: (0, short_uuid_1.generate)(),
                noteID: actionTrigger.noteID,
                objectKey: attachmentID,
                owner: actionTrigger.noteOwner,
                createdAt: now,
                name: `Video captions (${captionsURL})`,
            };
            await this.properties.noteAttachmentsStore.add(noteAttachment);
            console.log("Persisted note attachment with id ", noteAttachment.id);
        }
        return { actionMessage: "success", captionsURL };
    }
}
exports.FetchVideoInformation = FetchVideoInformation;
async function runFetchVideoInformation(event) {
    const configuration = (0, configuration_1.dependenciesConfiguration)({});
    const action = new FetchVideoInformation({
        parser: configuration.youtubeParser,
        attachmentsStore: configuration.attachmentsStore,
        noteAttachmentsStore: configuration.noteAttachmentsStore,
    });
    for (const record of event.Records) {
        if (record.eventName !== "INSERT") {
            console.log("Ignoring non-INSERT event", record.eventName);
            return;
        }
        const note = (0, dynamodb_stream_source_1.unmarshallRecordToNote)(record.dynamodb.NewImage);
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
            console.log("Ignoring a note without extensionProperties.youtubeURL set", note);
            return;
        }
        const result = await action.run({
            noteID: note.id,
            noteOwner: note.owner,
            videoURL: note.extensionProperties.youtubeURL,
        });
        console.log("action result", result);
        return result;
    }
}
exports.runFetchVideoInformation = runFetchVideoInformation;
//# sourceMappingURL=fetch-video-information.js.map