import { instance, mock, verify } from "ts-mockito";

import { resetConfigurationCache } from "../../../src/configuration/common";
import { LoggerBunyan } from "../../../src/logger/logger-bunyan";
import { NoteStore } from "../../../src/stores/note/note-store";
import {
  deleteAllNotesInNotebook,
  DeleteAllNotesInNotebookAction,
} from "./../../../src/workflows/notebook-deletion/delete-all-notes-in-notebook-action";

describe("deleteAllNotesInNotebook", () => {
  afterEach(() => {
    resetConfigurationCache();
  });

  it("should pass owner and notebookID to output", async () => {
    const output = await deleteAllNotesInNotebook({
      owner: "user1",
      notebookID: "my-notebook",
    });
    expect(output.owner).toBe("user1");
    expect(output.notebookID).toBe("my-notebook");
  });

  it("should delete all notes in notebook", async () => {
    const noteStoreMock = mock<NoteStore>();

    const action = new DeleteAllNotesInNotebookAction({
      logger: new LoggerBunyan(),
      noteStore: instance(noteStoreMock),
    });

    await action.run({
      owner: "user1",
      notebookID: "my-notebook",
    });

    verify(noteStoreMock.deleteAllInNotebook("user1", "my-notebook")).once();
  });
});
