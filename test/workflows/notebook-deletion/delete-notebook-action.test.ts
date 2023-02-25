import { LoggerBunyan } from "../../../src/logger/logger-bunyan";
import { InMemoryNotebookStore } from "../../../src/stores/notebook/notebook-store";
import {
  deleteNotebook,
  DeleteNotebookAction,
} from "../../../src/workflows/notebook-deletion/actions/delete-notebook-action";

describe("deleteNotebook", () => {
  it("throws an error if no notebook is found to be deleted", async () => {
    await expect(async () => {
      await deleteNotebook({
        Payload: { notebookID: "notebook1", owner: "user1" },
      });
    }).rejects.toThrow("Notebook is not found");
  });
  it("deletes a notebook", async () => {
    const notebookStore = new InMemoryNotebookStore();
    notebookStore.add({
      id: "notebook-1",
      owner: "user1",
      name: "My notebook",
      sections: [],
      tableColumns: [],
      createdAt: "now",
      updatedAt: "now",
      status: "MARKED_FOR_DELETION",
    });
    const action = new DeleteNotebookAction({
      logger: new LoggerBunyan(),
      notebookStore: notebookStore,
    });
    await action.run({
      notebookID: "notebook-1",
      owner: "user1",
    });
    const notebooks = await notebookStore.listAll("user1");
    expect(notebooks.length).toBe(0);
  });
});
