import { InMemoryNotebookStore } from "../../src/stores/notebook/notebook-store";

describe("Notebook store", () => {
  it("should throw an error when trying to delete non-existing notebook", async () => {
    const s = new InMemoryNotebookStore();

    await expect(
      async () => await s.deleteOne("", "some-non-existing id")
    ).rejects.toThrow("Notebook is not found");
  });
});
