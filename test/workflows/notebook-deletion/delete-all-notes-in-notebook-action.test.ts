import { deleteAllNotesInNotebook } from "./../../../src/workflows/notebook-deletion/delete-all-notes-in-notebook-action";

describe("deleteAllNotesInNotebook", () => {
  it("is not implemented yet", async () => {
    const output = await deleteAllNotesInNotebook({
      notebookID: "my-notebook",
    });
    expect(output.notebookID).toBe("my-notebook");
  });
});
