import { deleteNotebook } from "../../../src/workflows/notebook-deletion/delete-notebook-action";

describe("deleteNotebook", () => {
  it("is not implemented yet", async () => {
    const emptyResponse = await deleteNotebook({
      Payload: { notebookID: "notebook1" },
    });
    expect(emptyResponse).toBeUndefined();
  });
});
