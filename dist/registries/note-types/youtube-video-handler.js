"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeVideoHandler = void 0;
const plaintext_handler_1 = require("./plaintext-handler");
class YoutubeVideoHandler extends plaintext_handler_1.PlaintextNoteHandler {
    isMatchForAutoType(content) {
        return content.includes("youtube.com");
    }
    typeName() {
        return "youtube-video";
    }
    typeDisplayName() {
        return "youtube video";
    }
    render(note) {
        return {
            ...note,
            renderedContent: `Youtube: ${note.extensionProperties.youtubeURL}`,
        };
    }
    renderCreateForm() {
        return `<input type="text" name="youtube-url"/>`;
    }
    renderEditForm(note) {
        return `<input type="text" name="youtube-url" value="${note.extensionProperties.youtubeURL}" />`;
    }
    mapRequestToNewEntity(username, form) {
        const note = super.mapRequestToNewEntity(username, form);
        note.extensionProperties.youtubeURL = form["youtube-url"];
        if (form["note-content"] && !form["youtube-url"]) {
            note.extensionProperties.youtubeURL = form["note-content"];
            note.content = "";
        }
        return note;
    }
}
exports.YoutubeVideoHandler = YoutubeVideoHandler;
//# sourceMappingURL=youtube-video-handler.js.map