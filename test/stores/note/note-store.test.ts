import { InMemoryNoteStore } from "../../../src/stores/note/note-store";

describe("Notes store", () => {
  it("should edit and delete a note", async () => {
    const s = new InMemoryNoteStore();
    s.add({
      id: "note-id",
      owner: "testuser",
      content: "old content",
      type: { type: "" },
      notebookID: "notebook-1",
    });
    await s.editOne({
      id: "note-id",
      content: "new content",
      owner: "testuser",
      type: { type: "" },
      notebookID: "notebook-1",
    });
    const notes = await s.listAll("testuser");
    expect(notes.length).toBe(1);
    let note = await s.getOne("testuser", "note-id");
    expect(note.content).toBe("new content");
    await s.deleteOne("testuser", "note-id");
    note = await s.getOne("testuser", "note-id");
    expect(note).toBe(undefined);
  });
  it("should throw an error when trying to edit non-existing note", async () => {
    const s = new InMemoryNoteStore();

    await expect(
      async () =>
        await s.editOne({
          id: "some-non-existing id",
          content: "",
          owner: "",
          type: { type: "" },
          notebookID: "",
        })
    ).rejects.toThrow("Note is not found");
  });
  it("should throw an error when trying to delete non-existing note", async () => {
    const s = new InMemoryNoteStore();

    await expect(
      async () => await s.deleteOne("", "some-non-existing id")
    ).rejects.toThrow("Note is not found");
  });
  it("should return an empty list of items", async () => {
    const s = new InMemoryNoteStore();
    const items = await s.listAll("some-user");
    expect(items.length).toBe(0);
  });
  it("should return undefined when getting one", async () => {
    const s = new InMemoryNoteStore();
    const item = await s.getOne("some-user", "some-id");
    expect(item).toBe(undefined);
  });
  it("should delete all items in notebook", async () => {
    const s = new InMemoryNoteStore();
    await s.add({
      id: "note-1",
      notebookID: "notebook-1",
      owner: "testuser",
      content: "testcontent",
      type: { type: "" },
    });
    await s.add({
      id: "note-2",
      notebookID: "notebook-1",
      owner: "testuser",
      content: "testcontent",
      type: { type: "" },
    });
    await s.add({
      id: "note-3",
      notebookID: "notebook-2",
      owner: "testuser",
      content: "testcontent",
      type: { type: "" },
    });
    await s.deleteAllInNotebook("testuser", "notebook-1");
    const notes = await s.listAll("testuser");
    expect(notes.length).toBe(1);
  });
});
