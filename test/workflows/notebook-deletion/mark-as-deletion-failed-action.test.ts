import { LoggerBunyan } from "../../../src/logger/logger-bunyan";
import { InMemoryNotebookStore } from "../../../src/stores/notebook/notebook-store";
import {
  markAsDeletionFailed,
  MarkAsDeletionFailedAction,
} from "../../../src/workflows/notebook-deletion/actions/mark-as-deletion-failed-action";

describe("markAsDeletionFailed", () => {
  it("throws an error if no notebook is found to be updated", async () => {
    await expect(async () => {
      await markAsDeletionFailed({
        Payload: { notebookID: "notebook1", owner: "user1" },
      });
    }).rejects.toThrow("Notebook is not found");
  });
  it("updates notebook status", async () => {
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
    const action = new MarkAsDeletionFailedAction({
      logger: new LoggerBunyan(),
      notebookStore: notebookStore,
    });
    await action.run({
      notebookID: "notebook-1",
      owner: "user1",
    });
    const notebook = await notebookStore.getOne("user1", "notebook-1");
    expect(notebook.status).toBe("DELETION_FAILED");
  });
});
