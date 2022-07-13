import { PlaintextHandler } from "../../src/registries/note-types/plaintext-handler";

describe("Plaintext handler", () => {
  const h = new PlaintextHandler();
  it("should describe itself", () => {
    expect(h.typeName()).toBe("plaintext");
    expect(h.typeDisplayName()).toBe("Plain text");
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
