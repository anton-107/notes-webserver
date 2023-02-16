import { verifyNoNotesInNotebook } from "../../../src/workflows/notebook-deletion/verify-no-notes-in-notebook-action";

describe("verifyNoNotesInNotebook", () => {
  it("is not implemented yet", async () => {
    const output = await verifyNoNotesInNotebook({
      Payload: { notebookID: "notebook1" },
    });
    expect(output.notebookID).toBe("notebook1");
  });
});
