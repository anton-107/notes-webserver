import { FormBody } from "../../http/body-parser";
import { Note, RenderedNote } from "../../model/note-model";
import { NoteTypeHandler } from "../note-types-registry";
import { PlaintextNoteHandler } from "./plaintext-handler";

export class YoutubeVideoHandler
  extends PlaintextNoteHandler
  implements NoteTypeHandler
{
  public isMatchForAutoType(content: string): boolean {
    return content.includes("youtube.com");
  }
  typeName(): string {
    return "youtube-video";
  }
  typeDisplayName(): string {
    return "youtube video";
  }
  render(note: Note): RenderedNote {
    return {
      ...note,
      renderedContent: `Youtube: ${note.extensionProperties.youtubeURL}`,
    };
  }
  renderCreateForm(): string {
    return `<input type="text" name="youtube-url"/>`;
  }
  renderEditForm(note: Note): string {
    return `<input type="text" name="youtube-url" value="${note.extensionProperties.youtubeURL}" />`;
  }
  mapRequestToNewEntity(username: string, form: FormBody): Note {
    const note = super.mapRequestToNewEntity(username, form);
    note.extensionProperties.youtubeURL = form["youtube-url"];
    if (form["note-content"] && !form["youtube-url"]) {
      note.extensionProperties.youtubeURL = form["note-content"];
      note.content = "";
    }
    return note;
  }
}
