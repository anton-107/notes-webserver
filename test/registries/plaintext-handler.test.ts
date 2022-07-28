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
    expect(renderedNote.renderedContent).toContain("text for test");
  });
  it("should show note content textare in the edit form", () => {
    const note = {
      id: "",
      content: "text for test",
      notebook: { id: "", owner: "", name: "" },
      owner: "",
      type: { type: "" },
    };
    const form = h.renderEditForm(note);
    expect(form).toContain("<textarea");
    expect(form).toContain("text for test");
  });
  it("should mapRequestToExistingEntity", () => {
    const note = h.mapRequestToExistingEntity(
      "user1",
      {
        id: "",
        content: "text for test",
        notebook: { id: "", owner: "", name: "" },
        owner: "",
        type: { type: "" },
      },
      {
        "note-content": "this is updated content",
      }
    );
    expect(note.content).toBe("this is updated content");
  });
});
