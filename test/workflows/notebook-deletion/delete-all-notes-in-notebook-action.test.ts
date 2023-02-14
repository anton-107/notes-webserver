import { deleteAllNotesInNotebook } from "./../../../src/workflows/notebook-deletion/delete-all-notes-in-notebook-action";

describe("deleteAllNotesInNotebook", () => {
  it("is not implemented yet", async () => {
    const emptyResponse = await deleteAllNotesInNotebook({
      input: JSON.stringify({ notebookID: "my-notebook" }),
    });
    expect(emptyResponse).toBeUndefined();
  });
});
