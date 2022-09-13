import { DateRangeNoteHandler } from "../../src/registries/note-types/date-range-handler";

describe("DateRangeNote handler", () => {
  const h = new DateRangeNoteHandler();
  it("should render start and end date of the range", () => {
    const note = {
      id: "",
      content: "text for test",
      notebookID: "",
      owner: "",
      type: { type: "" },
      extensionProperties: {
        dateRangeStart: "2022-07-24",
        dateRangeEnd: "2022-08-24",
      },
    };
    const renderedNote = h.render(note);
    expect(renderedNote.renderedContent).toContain("2022-07-24");
    expect(renderedNote.renderedContent).toContain("2022-08-24");
  });
});
