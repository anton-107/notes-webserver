import { PlaintextNoteHandler } from "../../src/registries/note-types/plaintext-handler";

describe("Plaintext handler", () => {
  const h = new PlaintextNoteHandler();
  it("should describe itself", () => {
    expect(h.typeName()).toBe("note");
    expect(h.typeDisplayName()).toBe("plain note");
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
