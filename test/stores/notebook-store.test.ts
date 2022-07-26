import { InMemoryNotebookStore } from "../../src/stores/notebook/notebook-store";

describe("Notebook store", () => {
  it("should throw an error when trying to delete non-existing notebook", async () => {
    const s = new InMemoryNotebookStore();

    await expect(
      async () => await s.deleteOne("", "some-non-existing id")
    ).rejects.toThrow("Notebook is not found");
  });
  it("should throw an error when trying to edit non-existing notebook", async () => {
    const s = new InMemoryNotebookStore();

    await expect(
      async () =>
        await s.editOne({
          id: "some-non-existing id",
          name: "",
          owner: "",
        })
    ).rejects.toThrow("Notebook is not found");
  });
});
