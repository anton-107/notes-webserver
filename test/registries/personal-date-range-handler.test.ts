import { PersonalDateRangeNoteHandler } from "../../src/registries/note-types/personal-date-range-handler";

describe("PersonalDateRangeNoteHandler", () => {
  it("should select options in the edit form", () => {
    const note = {
      id: "",
      content: "text for test",
      notebook: { id: "", owner: "", name: "" },
      owner: "",
      type: { type: "" },
      extensionProperties: {
        personID: "",
        dateRangeStart: "2022-07-24",
        dateRangeEnd: "2022-08-24",
      },
    };
    const h = new PersonalDateRangeNoteHandler();
    const form1 = h.renderEditForm(note);
    expect(form1).not.toContain("selected");

    note.extensionProperties.personID = "justin-case";
    const form2 = h.renderEditForm(note);
    expect(form2).toContain("<option selected value='justin-case'>");

    note.extensionProperties.personID = "john-rope";
    const form3 = h.renderEditForm(note);
    expect(form3).toContain("<option selected value='john-rope'>");
  });
});
