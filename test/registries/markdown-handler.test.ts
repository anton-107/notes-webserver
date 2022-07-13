import { MarkdownHandler } from "../../src/registries/note-types/markdown-handler";

describe("Markdown handler", () => {
  const h = new MarkdownHandler();
  it("should describe itself", () => {
    expect(h.typeName()).toBe("markdown");
    expect(h.typeDisplayName()).toBe("Markdown formatting");
  });
  it("should render plain text without changes", () => {
    const note = {
      id: "",
      content: "text for test",
      notebook: { id: "", owner: "", name: "" },
      owner: "",
      type: { type: "" },
    };
    const renderedNote = h.render(note);
    expect(renderedNote.renderedContent).toBe("text for test");
  });
});
