import { MarkdownHandler } from "../../src/registries/note-types/markdown-handler";
import { NotebookTableColumnsRegistry } from "../../src/registries/notebook-table-columns-registry";

describe("Markdown handler", () => {
  const h = new MarkdownHandler({
    notebookTableColumnsRegistry: new NotebookTableColumnsRegistry(),
  });
  it("should describe itself", () => {
    expect(h.typeName()).toBe("markdown");
    expect(h.typeDisplayName()).toBe("markdown formatted note");
  });
  it("should render plain text without changes", () => {
    const note = {
      id: "",
      content: "text for test",
      notebookID: "",
      owner: "",
      type: { type: "" },
    };
    const renderedNote = h.render(note);
    expect(renderedNote.renderedContent).toContain("text for test");
  });
  it("should show note content textare in the edit form", () => {
    const note = {
      id: "",
      content: "text for test",
      notebookID: "",
      owner: "",
      type: { type: "" },
    };
    const form = h.renderEditForm(note);
    expect(form).toContain("<textarea");
    expect(form).toContain("text for test");
  });
});
