import { InMemoryNotebookStore } from "../../../src/stores/notebook/notebook-store";

describe("Notebook store", () => {
  it("should delete an item", async () => {
    const s = new InMemoryNotebookStore();
    await s.add({
      id: "notebook-1",
      owner: "user-1",
      name: "",
      sections: [],
      tableColumns: [],
      createdAt: "",
      updatedAt: "",
      status: "",
    });
    let notebooks = await s.listAll("user-1");
    expect(notebooks.length).toBe(1);
    await s.deleteOne("user-1", "notebook-1");
    notebooks = await s.listAll("user-1");
    expect(notebooks.length).toBe(0);
  });
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
          sections: [],
          tableColumns: [],
          createdAt: "",
          updatedAt: "",
          status: "",
        })
    ).rejects.toThrow("Notebook is not found");
  });
});
