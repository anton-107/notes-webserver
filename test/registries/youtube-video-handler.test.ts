import { NotebookTableColumnsRegistry } from "../../src/registries/notebook-table-columns-registry";
import { YoutubeVideoHandler } from "./../../src/registries/note-types/youtube-video-handler";

describe("YoutubeVideoHandler handler", () => {
  it("should render with prefix", () => {
    const handler = new YoutubeVideoHandler({
      notebookTableColumnsRegistry: new NotebookTableColumnsRegistry(),
    });
    handler.render({
      id: "",
      content: "",
      notebookID: "notebook-1",
      owner: "user-1",
      type: { type: "youtube-video" },
      extensionProperties: {
        youtubeURL: "https://www.youtube.com/watch?v=XXXXX",
      },
    });
  });
  it("should render create form with an input", () => {
    const handler = new YoutubeVideoHandler({
      notebookTableColumnsRegistry: new NotebookTableColumnsRegistry(),
    });
    const html = handler.renderCreateForm();
    expect(html).toBe(`<input type="text" name="youtube-url"/>`);
  });
  it("should render edit form with an input", () => {
    const handler = new YoutubeVideoHandler({
      notebookTableColumnsRegistry: new NotebookTableColumnsRegistry(),
    });
    const html = handler.renderEditForm({
      id: "",
      content: "",
      notebookID: "notebook-1",
      owner: "user-1",
      type: { type: "youtube-video" },
      extensionProperties: {
        youtubeURL: "https://www.youtube.com/watch?v=XXXXX",
      },
    });
    expect(html).toBe(
      `<input type="text" name="youtube-url" value="https://www.youtube.com/watch?v=XXXXX" />`
    );
  });
});
