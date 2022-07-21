import { DateRangeNoteHandler } from "../../src/registries/note-types/date-range-handler";

describe("DateRangeNote handler", () => {
  const h = new DateRangeNoteHandler();
  it("should (for now) render plain text without changes", () => {
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
